#!/bin/bash
# RS-SDK 本地开发服务启动脚本
# 用法: ./server/start.sh [start|stop|restart|status]

set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PID_DIR="$ROOT_DIR/server/.pids"
mkdir -p "$PID_DIR"

ENGINE_PID_FILE="$PID_DIR/engine.pid"
GATEWAY_PID_FILE="$PID_DIR/gateway.pid"

red()   { printf "\033[31m%s\033[0m\n" "$*"; }
green() { printf "\033[32m%s\033[0m\n" "$*"; }
yellow(){ printf "\033[33m%s\033[0m\n" "$*"; }

is_running() {
    local pid_file="$1"
    if [ -f "$pid_file" ]; then
        local pid
        pid=$(cat "$pid_file")
        if kill -0 "$pid" 2>/dev/null; then
            return 0
        fi
        rm -f "$pid_file"
    fi
    return 1
}

do_stop() {
    local stopped=0

    if is_running "$ENGINE_PID_FILE"; then
        local pid=$(cat "$ENGINE_PID_FILE")
        echo "停止 Engine (PID $pid)..."
        kill "$pid" 2>/dev/null || true
        # 等待进程退出
        for i in $(seq 1 10); do
            if ! kill -0 "$pid" 2>/dev/null; then break; fi
            sleep 0.5
        done
        # 强制终止
        kill -9 "$pid" 2>/dev/null || true
        rm -f "$ENGINE_PID_FILE"
        stopped=1
    fi

    if is_running "$GATEWAY_PID_FILE"; then
        local pid=$(cat "$GATEWAY_PID_FILE")
        echo "停止 Gateway (PID $pid)..."
        kill "$pid" 2>/dev/null || true
        for i in $(seq 1 10); do
            if ! kill -0 "$pid" 2>/dev/null; then break; fi
            sleep 0.5
        done
        kill -9 "$pid" 2>/dev/null || true
        rm -f "$GATEWAY_PID_FILE"
        stopped=1
    fi

    # 清理可能残留的端口占用
    local engine_pid=$(lsof -ti :43594 2>/dev/null || true)
    if [ -n "$engine_pid" ]; then
        echo "清理残留 Engine 进程 (PID $engine_pid)..."
        kill "$engine_pid" 2>/dev/null || true
        sleep 1
        kill -9 "$engine_pid" 2>/dev/null || true
    fi

    local gateway_pid=$(lsof -ti :7780 2>/dev/null || true)
    if [ -n "$gateway_pid" ]; then
        echo "清理残留 Gateway 进程 (PID $gateway_pid)..."
        kill "$gateway_pid" 2>/dev/null || true
        sleep 1
        kill -9 "$gateway_pid" 2>/dev/null || true
    fi

    if [ $stopped -eq 1 ]; then
        green "所有服务已停止"
    else
        yellow "没有正在运行的服务"
    fi
}

do_start() {
    # 检查是否已经在运行
    if is_running "$ENGINE_PID_FILE" && is_running "$GATEWAY_PID_FILE"; then
        yellow "服务已在运行中，使用 restart 重启"
        do_status
        return 0
    fi

    # 构建 Web Client
    echo "构建 Web Client..."
    cd "$ROOT_DIR/server/webclient" && bun run build
    green "Web Client 构建完成"

    # 启动 Engine (线上模式: NODE_DEBUG=false)
    echo "启动 Engine..."
    cd "$ROOT_DIR/server/engine"
    NODE_DEBUG=false bun run src/app.ts > "$PID_DIR/engine.log" 2>&1 &
    echo $! > "$ENGINE_PID_FILE"
    echo "  PID: $(cat "$ENGINE_PID_FILE")"

    # 等待 Engine 就绪
    echo "等待 Engine 就绪..."
    for i in $(seq 1 60); do
        if lsof -ti :43594 >/dev/null 2>&1; then
            green "Engine 已就绪 (端口 43594)"
            break
        fi
        if [ "$i" -eq 60 ]; then
            red "Engine 启动超时"
            return 1
        fi
        sleep 1
    done

    # 启动 Gateway
    echo "启动 Gateway..."
    cd "$ROOT_DIR/server/gateway"
    bun run gateway.ts > "$PID_DIR/gateway.log" 2>&1 &
    echo $! > "$GATEWAY_PID_FILE"
    echo "  PID: $(cat "$GATEWAY_PID_FILE")"

    # 等待 Gateway 就绪
    for i in $(seq 1 15); do
        if lsof -ti :7780 >/dev/null 2>&1; then
            green "Gateway 已就绪 (端口 7780)"
            break
        fi
        if [ "$i" -eq 15 ]; then
            red "Gateway 启动超时"
            return 1
        fi
        sleep 1
    done

    echo ""
    green "=== 所有服务启动完成 ==="
    do_status
}

do_status() {
    echo ""
    echo "服务状态:"
    echo "─────────────────────────────────"

    if is_running "$ENGINE_PID_FILE"; then
        local pid=$(cat "$ENGINE_PID_FILE")
        green "  Engine   ● 运行中  PID=$pid  端口=43594"
    elif lsof -ti :43594 >/dev/null 2>&1; then
        local pid=$(lsof -ti :43594 2>/dev/null)
        yellow "  Engine   ● 运行中  PID=$pid  端口=43594 (未由本脚本管理)"
    else
        red "  Engine   ○ 未运行"
    fi

    if is_running "$GATEWAY_PID_FILE"; then
        local pid=$(cat "$GATEWAY_PID_FILE")
        green "  Gateway  ● 运行中  PID=$pid  端口=7780"
    elif lsof -ti :7780 >/dev/null 2>&1; then
        local pid=$(lsof -ti :7780 2>/dev/null)
        yellow "  Gateway  ● 运行中  PID=$pid  端口=7780 (未由本脚本管理)"
    else
        red "  Gateway  ○ 未运行"
    fi

    echo "─────────────────────────────────"
    echo "  日志: $PID_DIR/engine.log"
    echo "        $PID_DIR/gateway.log"
}

case "${1:-start}" in
    start)
        do_start
        ;;
    stop)
        do_stop
        ;;
    restart)
        echo "重启服务..."
        do_stop
        sleep 2
        do_start
        ;;
    status)
        do_status
        ;;
    *)
        echo "用法: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac

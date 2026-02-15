import Player from '#/engine/entity/Player.js';
import ClientGameMessageHandler from '#/network/game/client/ClientGameMessageHandler.js';
import IdleTimer from '#/network/game/client/model/IdleTimer.js';
import Environment from '#/util/Environment.js';

export default class IdleTimerHandler extends ClientGameMessageHandler<IdleTimer> {
    handle(_message: IdleTimer, _player: Player): boolean {
        // Idle logout disabled - bot clients controlled via SDK don't generate
        // real input, so they always trigger the idle timer.
        return true;
    }
}

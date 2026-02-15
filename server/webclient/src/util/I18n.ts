/**
 * Client-side translation for i18n support.
 * Translates UI text, menu options, and other client-rendered strings.
 */

const ZH_DICT: Record<string, string> = {
    // Menu & right-click
    'Cancel': '取消',
    'Walk here': '走到这里',
    'Examine': '查看',
    'Use': '使用',
    'Take': '拾取',
    'Drop': '丢弃',
    'Choose Option': '选择操作',

    // NPC interaction options
    'Talk-to': '交谈',
    'Attack': '攻击',
    'Pickpocket': '扒窃',
    'Trade': '交易',
    'Trade with': '交易',
    'Follow': '跟随',
    'Fight': '战斗',
    'Duel-with': '决斗',

    // Location options
    'Open': '打开',
    'Close': '关闭',
    'Climb-up': '向上攀爬',
    'Climb-down': '向下攀爬',
    'Climb': '攀爬',
    'Search': '搜索',
    'Mine': '采矿',
    'Prospect': '勘探',
    'Smelt': '冶炼',
    'Smith': '锻造',
    'Chop down': '砍伐',
    'Chop': '砍伐',
    'Net': '网捕',
    'Bait': '诱饵钓',
    'Lure': '引诱钓',
    'Cage': '笼捕',
    'Harpoon': '鱼叉捕',
    'Fish': '钓鱼',
    'Cook': '烹饪',
    'Bank': '银行',
    'Deposit': '存入',
    'Pray': '祈祷',
    'Pray-at': '在此祈祷',
    'Enter': '进入',
    'Exit': '离开',
    'Read': '阅读',
    'Steal from': '偷窃',
    'Pick': '采摘',
    'Fill': '装满',
    'Light': '点燃',

    // Item operations (inventory)
    'Wield': '装备',
    'Wear': '穿戴',
    'Equip': '装备',
    'Remove': '卸下',
    'Eat': '吃',
    'Drink': '喝',
    'Bury': '埋葬',
    'Burn': '燃烧',

    // Chat bar
    'Public chat': '公共聊天',
    'Private chat': '私聊',
    'Trade/duel': '交易/决斗',
    'Report abuse': '举报',

    // Social
    'Add friend': '添加好友',
    'Add ignore': '添加屏蔽',
    'Accept trade': '接受交易',
    'Accept duel': '接受决斗',
    'Report abuse': '举报滥用',

    // Login screen
    'Login:': '登录:',
    'Password:': '密码:',
    'Login': '登录',
    'New User': '新用户',
    'Existing User': '已有账号',

    // Settings & status
    'On': '开启',
    'Off': '关闭',
    'Friends': '好友',
    'Hide': '隐藏',

    // Combat
    'Cast': '施法',

    // Interface components
    'LOG OUT': '退出登录',
    'Logout': '退出',
    'Click here to logout': '点击此处安全退出',
    'Please wait...': '请稍候...',
    'Loading - please wait.': '加载中 - 请稍候。',
    'When you have finished playing': '当你结束游戏时',
    'RuneScape, always use the': '请务必使用下方按钮',
    'button below to logout safely.': '安全退出 RuneScape。',

    // ===== Stats panel =====
    'Combat Lvl: %1': '战斗等级: %1',
    'Total Lvl: %1': '总等级: %1',
    'QP: %1': '任务点: %1',

    // Skill names (used in skill panel hover, etc.)
    'Attack': '攻击',
    'Defence': '防御',
    'Strength': '力量',
    'Hitpoints': '生命值',
    'Ranged': '远程',
    'Prayer': '祈祷',
    'Magic': '魔法',
    'Cooking': '烹饪',
    'Woodcutting': '伐木',
    'Fletching': '制箭',
    'Fishing': '钓鱼',
    'Firemaking': '生火',
    'Crafting': '制作',
    'Smithing': '锻造',
    'Mining': '采矿',
    'Herblore': '草药学',
    'Agility': '敏捷',
    'Thieving': '盗窃',
    'Runecraft': '符文制作',

    // Skill XP hover tooltips (template with %1)
    'Attack XP:': '攻击经验:',
    'Defence XP:': '防御经验:',
    'Strength XP:': '力量经验:',
    'Hitpoints XP:': '生命经验:',
    'Ranged XP:': '远程经验:',
    'Prayer XP:': '祈祷经验:',
    'Magic XP:': '魔法经验:',
    'Cooking XP:': '烹饪经验:',
    'Woodcutting XP:': '伐木经验:',
    'Fletching XP:': '制箭经验:',
    'Fishing XP:': '钓鱼经验:',
    'Firemaking XP:': '生火经验:',
    'Crafting XP:': '制作经验:',
    'Smithing XP:': '锻造经验:',
    'Mining XP:': '采矿经验:',
    'Herblore XP:': '草药学经验:',
    'Agility XP:': '敏捷经验:',
    'Thieving XP:': '盗窃经验:',
    'Runecraft XP:': '符文制作经验:',
    'Next Level At:': '下一等级:',
    'Combat Lvl: %1': '战斗等级: %1',
    'Total Lvl: %1': '总等级: %1',
    'QP: %1': '任务点: %1',

    // ===== Combat panel =====
    'Choose Attack Style': '选择攻击方式',
    'Select a Combat Spell': '选择战斗法术',
    'Choose': '选择',
    'Attack with': '攻击方式',
    'Controlled': '均衡',
    'Aggressive': '攻击型',
    'Accurate': '精准型',
    'Defensive': '防御型',
    'Rapid': '快速',
    'Longrange': '远距离',
    'Weapon:': '武器:',
    'Auto Retaliate': '自动反击',
    '(Auto Retaliate)': '(自动反击)',
    'XP:': '经验:',
    'unarmed': '徒手',
    // Attack styles
    'Punch': '拳击',
    'Kick': '踢击',
    'Block': '格挡',
    'Slash': '斩击',
    'Stab': '刺击',
    'Crush': '碾压',
    'Hack': '猛砍',
    'Smash': '粉碎',
    'Lunge': '刺突',
    'Swipe': '横扫',
    'Pound': '重击',
    'Pummel': '连击',
    'Spike': '穿刺',
    'Impale': '贯穿',
    'Jab': '戳击',
    'Reap': '收割',
    'Focus - Block': '聚力 - 格挡',
    'Last Spell': '上次法术',
    'Re-Cast': '重铸',
    'Spell': '法术',
    'cancel': '取消',
    'S P E C I A L  A T T A C K': '特 殊 攻 击',
    '(none set)': '(未设置)',
    // Damage types
    '(Accurate)': '(精准)',
    '(Aggressive)': '(攻击)',
    '(Defensive)': '(防御)',
    '(Controlled)': '(均衡)',
    '(Crush)': '(碾压)',
    '(Slash)': '(斩击)',
    '(Stab)': '(刺击)',
    // Spell descriptions
    'A basic Air missile': '基础风弹',
    'A basic Water missile': '基础水弹',
    'A basic Earth missile': '基础土弹',
    'A basic Fire missile': '基础火弹',
    'A low level Air missile': '低级风弹',
    'A low level Water missile': '低级水弹',
    'A low level Earth missile': '低级土弹',
    'A low level Fire missile': '低级火弹',
    'A medium level Air missile': '中级风弹',
    'A medium level Water missile': '中级水弹',
    'A high level Air missile': '高级风弹',
    'A high level Water missile': '高级水弹',
    'A high level Fire missile': '高级火弹',

    // ===== Quest panel =====
    'Quest Journal': '任务日志',
    'Free Quests': '免费任务',
    'FREE QUESTS:': '免费任务:',
    "Members' Quests": '会员任务',
    'MEMBERS QUESTS:': '会员任务:',
    'Quest Points: %1': '任务点数: %1',
    // Quest names
    "Black Knight's Fortress": '黑骑士要塞',
    "Cook's Assistant": '厨师的助手',
    'Demon Slayer': '恶魔杀手',
    "Doric's Quest": '多里克的任务',
    'Dragon Slayer': '龙杀手',
    "Ernest the Chicken": '变鸡的欧尼斯特',
    'Goblin Diplomacy': '哥布林外交',
    'Imp Catcher': '小鬼捕手',
    "The Knight's Sword": '骑士之剑',
    "Pirate's Treasure": '海盗的宝藏',
    'Prince Ali Rescue': '拯救阿里王子',
    "The Restless Ghost": '不安的幽灵',
    "Romeo & Juliet": '罗密欧与朱丽叶',
    'Rune Mysteries': '符文之谜',
    'Sheep Shearer': '剪羊毛',
    'Shield of Arrav': '阿拉夫之盾',
    'Vampire Slayer': '吸血鬼猎手',
    "Witch's Potion": '女巫的药水',

    // ===== Magic panel =====
    'Wind Strike': '风之打击',
    'Water Strike': '水之打击',
    'Earth Strike': '土之打击',
    'Fire Strike': '火之打击',
    'Wind Bolt': '风之闪电',
    'Water Bolt': '水之闪电',
    'Earth Bolt': '土之闪电',
    'Fire Bolt': '火之闪电',
    'Wind Blast': '风之爆破',
    'Water Blast': '水之爆破',
    'Earth Blast': '土之爆破',
    'Fire Blast': '火之爆破',
    'Wind Wave': '风之波浪',
    'Water Wave': '水之波浪',
    'Earth Wave': '土之波浪',
    'Fire Wave': '火之波浪',
    'Confuse': '迷惑',
    'Weaken': '削弱',
    'Curse': '诅咒',
    'Vulnerability': '脆弱',
    'Enfeeble': '虚弱',
    'Stun': '眩晕',
    'Bind': '束缚',
    'Snare': '陷阱',
    'Entangle': '缠绕',
    'Bones to Bananas': '骨头变香蕉',
    'Bones to Peaches': '骨头变桃子',
    'Low Level Alchemy': '低级炼金术',
    'High Level Alchemy': '高级炼金术',
    'Superheat Item': '超级加热',
    'Telekinetic Grab': '隔空取物',
    'Varrock Teleport': '传送到瓦洛克',
    'Lumbridge Teleport': '传送到伦布里奇',
    'Falador Teleport': '传送到法拉多',
    'Camelot Teleport': '传送到卡默洛特',
    'Ardougne Teleport': '传送到阿多格尼',
    'Watchtower Teleport': '传送到瞭望塔',
    'Charge': '充能',
    'Iban Blast': '伊班爆破',
    'Crumble Undead': '粉碎亡灵',
    'Magic Dart': '魔法飞镖',
    'Saradomin Strike': '萨拉多明之击',
    'Saradomin strike': '萨拉多明之击',
    'Claws of Guthix': '古斯克斯之爪',
    'Flames of Zamorak': '扎莫拉克之焰',
    'Enchant Lvl-1 Jewelry': '附魔1级饰品',
    'Enchant Lvl-2 Jewelry': '附魔2级饰品',
    'Enchant Lvl-3 Jewelry': '附魔3级饰品',
    'Enchant Lvl-4 Jewelry': '附魔4级饰品',
    'Enchant Lvl-5 Jewelry': '附魔5级饰品',
    'Charge Water Orb': '充能水宝珠',
    'Charge Earth Orb': '充能土宝珠',
    'Charge Fire Orb': '充能火宝珠',
    'Charge Air Orb': '充能风宝珠',
    'Level %1 :': '等级 %1 :',
    // Magic spell descriptions
    'A basic Air missile': '基础风系飞弹',
    'A basic Water missile': '基础水系飞弹',
    'A basic Earth missile': '基础土系飞弹',
    'A basic Fire missile': '基础火系飞弹',
    'A low level Air missile': '低级风系飞弹',
    'A low level Water missile': '低级水系飞弹',
    'A low level Earth missile': '低级土系飞弹',
    'A low level Fire missile': '低级火系飞弹',
    'A medium level Air missile': '中级风系飞弹',
    'A medium level Water missile': '中级水系飞弹',
    'A medium level Earth missile': '中级土系飞弹',
    'A medium level Fire missile': '中级火系飞弹',
    'A high level Air missile': '高级风系飞弹',
    'A high level Water missile': '高级水系飞弹',
    'A high level Earth missile': '高级土系飞弹',
    'A high level Fire missile': '高级火系飞弹',
    'Reduces your opponents\\nattack by 5 %': '降低对手\\n攻击力5%',
    'Reduces your opponents\\nstrength by 5%': '降低对手\\n力量5%',
    'Reduces your opponents\\ndefence by 5%': '降低对手\\n防御力5%',
    'Changes all held bones into\\nbananas': '将所有骨头\\n变成香蕉',
    'Converts an item into gold': '将物品转化为金币',
    'Converts an item into\\nmore gold': '将物品转化为\\n更多金币',
    'Smelt ore without a furnace': '无需熔炉冶炼矿石',
    'Take an item you can see\\nbut can\'t reach': '拾取你能看到\\n但够不到的物品',
    'Teleports you to Varrock': '传送到瓦洛克',
    'Teleports you to Lumbridge': '传送到伦布里奇',
    'Teleports you to Falador': '传送到法拉多',
    'Teleports you to Camelot': '传送到卡默洛特',
    'Teleports you to Ardougne': '传送到阿多格尼',
    'Teleports you to the Watchtower': '传送到瞭望塔',
    'Teleports you to the\\nWatchtower': '传送到\\n瞭望塔',
    'Reduces your opponents\\ndefense by 10%': '降低对手\\n防御力10%',
    'Reduces your opponents\\nstrength by 10%': '降低对手\\n力量10%',
    'Reduces your opponents\\nattack by 10%': '降低对手\\n攻击力10%',
    'Holds your opponent\\nfor 5 seconds': '束缚对手\\n5秒',
    'Holds your opponents\\nfor 10 seconds': '束缚对手\\n10秒',
    'Holds your opponent\\nfor 15 seconds': '束缚对手\\n15秒',
    'For use on sapphire jewelry': '用于蓝宝石饰品',
    'For use on emerald jewelry': '用于祖母绿饰品',
    'For use on ruby jewelry': '用于红宝石饰品',
    'For use on diamond jewelry': '用于钻石饰品',
    'For use on dragonstone jewelry': '用于龙石饰品',
    'Summons the wrath of Iban': '召唤伊班之怒',
    'Summons the power\\nof Saradomin': '召唤萨拉多明\\n之力',
    'Summons the power\\nof Guthix': '召唤古斯克斯\\n之力',
    'Summons the power\\nof Zamorak': '召唤扎莫拉克\\n之力',
    'Hits skeletons, ghosts and\\nzombies hard': '对骷髅、幽灵和\\n僵尸造成重击',
    'Temporarily increases the power\\nof the three arena spells': '暂时增强三种\\n竞技场法术的威力',
    'Needs to be cast on\\na water obelisk': '需要对水方尖碑\\n施放',
    'Needs to be cast on\\na earth obelisk': '需要对土方尖碑\\n施放',
    'Needs to be cast on\\na fire obelisk': '需要对火方尖碑\\n施放',
    'Needs to be cast on\\na air obelisk': '需要对风方尖碑\\n施放',
    'Requires: %1': '需要: %1',

    // ===== Prayer panel =====
    'Thick Skin': '厚皮术',
    'Burst of Strength': '力量爆发',
    'Clarity of Thought': '思维清晰',
    'Rock Skin': '岩石之肤',
    'Superhuman Strength': '超人之力',
    'Improved Reflexes': '反应提升',
    'Rapid Restore': '快速恢复',
    'Rapid Heal': '快速治疗',
    'Protect Items': '保护物品',
    'Steel Skin': '钢铁之肤',
    'Ultimate Strength': '极致之力',
    'Incredible Reflexes': '超凡反应',
    'Protect from Magic': '魔法保护',
    'Protect From Missiles': '远程保护',
    'Protect from Melee': '近战保护',
    'Increases your defence by 5%': '防御力提升5%',
    'Increases your strength by 5%': '力量提升5%',
    'Increases your attack by 5%': '攻击力提升5%',
    'Increases your defence by 10%': '防御力提升10%',
    'Increases your strength by 10%': '力量提升10%',
    'Increases your attack by 10%': '攻击力提升10%',
    'Increases your defence by 15%': '防御力提升15%',
    'Increases your strength by 15%': '力量提升15%',
    'Increases your attack by 15%': '攻击力提升15%',
    '2x restore rate for all stats\\nexcept hitpoints and prayer': '除生命和祈祷外\\n所有属性恢复速度翻倍',
    '2x restore rate for hitpoints stat': '生命值恢复速度翻倍',
    'Keep 1 extra item if you die': '死亡时多保留1件物品',
    'Protection from magical attacks': '抵御魔法攻击',
    'Protection from ranged attacks': '抵御远程攻击',
    'Protection from close attacks': '抵御近战攻击',
    'Prayer: %1/%2': '祈祷: %1/%2',
    'Points: %1': '点数: %1',

    // ===== Equipment panel =====
    'Attack bonus': '攻击加成',
    'Defence bonus': '防御加成',
    'Other bonuses': '其他加成',
    'Ranged': '远程',
    'Magic': '魔法',
    'Range': '远程',
    'Strength': '力量',
    'Prayer': '祈祷',

    // ===== Tab names & common =====
    'Combat': '战斗',
    'Stats': '属性',
    'Quest': '任务',
    'Inventory': '背包',
    'Equipment': '装备',
    'Friends': '好友',
    'Ignore': '屏蔽',
    'Options': '设置',
    'Emotes': '表情',
    'Music': '音乐',
    'Close': '关闭',
    'Select': '选择',
    'Confirm': '确认',
    'Yes': '是',
    'No': '否',
    'Ok': '确定',
    'Back': '返回',

    // ===== Character design =====
    'Welcome to RuneScape - Use the buttons below to design your player': '欢迎来到 RuneScape - 使用下方按钮设计你的角色',
    'Design': '设计',
    'Colour': '颜色',
    'Head': '头部',
    'Jaw': '下颌',
    'Torso': '躯干',
    'Arms': '手臂',
    'Hands': '双手',
    'Legs': '腿部',
    'Feet': '脚部',
    'Hair': '头发',
    'Skin': '皮肤',
    'Gender': '性别',
    'Male': '男性',
    'Female': '女性',
    'Accept': '确认',
    'Change head': '更换头部',
    'Change jaw': '更换下颌',
    'Change torso': '更换躯干',
    'Change arms': '更换手臂',
    'Change hands': '更换双手',
    'Change legs': '更换腿部',
    'Change feet': '更换脚部',
    'Recolour hair': '更换头发颜色',
    'Recolour torso': '更换躯干颜色',
    'Recolour legs': '更换腿部颜色',
    'Recolour feet': '更换脚部颜色',
    'Recolour skin': '更换皮肤颜色',

    // ===== Login screen =====
    'Welcome to RuneScape': '欢迎来到 RuneScape',
    'New user': '新用户',
    'Existing User': '已有账号',
    'Username:': '用户名:',
    'Password:': '密码:',
    'Login': '登录',
    'Create a free account': '创建免费账号',
    'To create a new account you need to': '要创建新账号，你需要',
    'go back to the main RuneScape webpage': '返回 RuneScape 主页',
    "and choose the red 'create account'": '并点击页面右上角的',
    'button at the top right of that page.': '红色「创建账号」按钮。',

    // ===== Welcome & system =====
    'Welcome to RuneScape.': '欢迎来到 RuneScape。',
    'Click to continue': '点击继续',
    'Click here to continue': '点击此处继续',
    'Select an Option': '选择一个选项',
    'Please wait': '请稍候',
    'Connection lost': '连接已断开',
    'Please wait - attempting to reestablish': '请稍候 - 正在尝试重新连接',

    // ===== Level up ===== (handled by pattern matching in t())

    // ===== Bank =====
    'Withdraw as:': '取出为:',
    'Item': '物品',
    'Note': '票据',
    'Rearrange mode:': '排列方式:',
    'Swap': '交换',
    'Insert': '插入',

    // ===== Music panel =====
    'Music Player': '音乐播放器',
    'Playing:': '正在播放:',
    'AUTO': '自动',
    'MAN': '手动',
    'MANUAL': '手动',
    'Click the tune to play.': '点击曲名播放。',
    'Green=Unlocked': '绿色=已解锁',
    'Red=Locked': '红色=未解锁',
    'Unlocked': '已解锁',
    'Locked': '未解锁',

    // ===== Emotes panel =====
    'Yes': '是',
    'No': '否',
    'Think': '思考',
    'Bow': '鞠躬',
    'Angry': '愤怒',
    'Cry': '哭泣',
    'Laugh': '大笑',
    'Cheer': '欢呼',
    'Wave': '挥手',
    'Beckon': '招手',
    'Clap': '拍手',
    'Dance': '跳舞',
    'Panic': '恐慌',
    'Jig': '跳跃舞',
    'Spin': '旋转',
    'Headbang': '摇头',
    'Jump for Joy': '开心跳跃',
    'Raspberry': '吐舌头',
    'Yawn': '打哈欠',
    'Salute': '敬礼',
    'Shrug': '耸肩',
    'Blow Kiss': '飞吻',
    'Glass Box': '玻璃箱',
    'Climb Rope': '爬绳子',
    'Lean': '倚靠',
    'Goblin Bow': '哥布林鞠躬',
    'Goblin Salute': '哥布林敬礼',

    // ===== Player controls panel =====
    'Player controls': '玩家控制',
    'Move speed': '移动速度',
    'Walk': '步行',
    'Run': '奔跑',
    'Energy left:': '剩余体力:',
    'Weight carried:': '负重:',
    'Emote animations': '表情动画',
    'Auto retaliate': '自动反击',

    // ===== Options panel =====
    'Game Options': '游戏设置',
    'Screen Brightness': '屏幕亮度',
    'Brightness': '亮度',
    'Dark': '暗',
    'Normal': '正常',
    'Bright': '明亮',
    'V-Bright': '非常亮',
    'Music volume': '音乐音量',
    'Music': '音乐',
    'Volume': '音量',
    'Sound effects volume': '音效音量',
    'Effect': '音效',
    'Mouse buttons': '鼠标按键',
    'One': '单键',
    'Two': '双键',
    'Chat effects': '聊天特效',
    'Split Private-chat': '分离私聊',

    // ===== Friends panel =====
    'Friends List': '好友列表',
    'Ignore List': '屏蔽列表',
    'Add Friend': '添加好友',
    'Del Friend': '删除好友',
    'Add Name': '添加名字',
    'Del Name': '删除名字',
    'Online': '在线',
    'Offline': '离线',
    'World %1': '世界 %1',

    // ===== Misc =====
    'Members Object': '会员物品',
    'Coins': '金币',
    'Not started': '未开始',
    'Started': '已开始',
    'Completed': '已完成',

    // ===== Game messages (mes) =====
    // --- Interaction ---
    'Nothing interesting happens.': '没有什么有趣的事情发生。',
    'But nothing interesting happens.': '但没有什么有趣的事情发生。',
    'But nothing happens.': '但什么也没发生。',
    "You can't reach that!": '你够不到那里！',
    "I can't reach that!": '我够不到那里！',
    'You find nothing of interest.': '你没发现什么有趣的东西。',
    'You find nothing.': '你什么也没找到。',
    'But you find nothing.': '但你什么也没找到。',
    "You don't find anything interesting.": '你没有发现任何有趣的东西。',
    'You notice nothing significant about this.': '你没有注意到什么特别的东西。',
    'These may have something in them.': '这些里面可能有东西。',
    "There's nothing interesting in these sacks.": '这些麻袋里没有什么有趣的东西。',

    // --- Doors & locks ---
    'The door is locked.': '门被锁上了。',
    'This door is locked.': '这扇门被锁上了。',
    'This door is securely locked.': '这扇门被牢牢锁住了。',
    'The chest is locked.': '箱子被锁上了。',
    'You open the chest.': '你打开了箱子。',
    'You close the chest.': '你关上了箱子。',
    'You search the crate...': '你搜索了板条箱...',
    'You search the crate.': '你搜索了板条箱。',
    'You manage to pick the lock.': '你成功撬开了锁。',
    'But it refuses to open.': '但它拒绝打开。',
    "But it's magically sealed.": '但它被魔法封印了。',

    // --- Woodcutting ---
    'You swing your axe at the tree.': '你挥动斧头砍向树木。',
    'You get some logs.': '你获得了一些原木。',
    'You get some oak logs.': '你获得了一些橡木原木。',
    'You get some willow logs.': '你获得了一些柳木原木。',
    'You get some maple logs.': '你获得了一些枫木原木。',
    'You get some yew logs.': '你获得了一些紫杉原木。',
    'You get some magic logs.': '你获得了一些魔法原木。',
    'Your inventory is too full to hold any more logs.': '你的背包已满，无法容纳更多原木。',

    // --- Mining ---
    'You swing your pickaxe at the rock.': '你挥动镐子凿向岩石。',
    'You manage to mine some copper.': '你成功开采了一些铜矿。',
    'You manage to mine some tin.': '你成功开采了一些锡矿。',
    'You manage to mine some iron.': '你成功开采了一些铁矿。',
    'You manage to mine some coal.': '你成功开采了一些煤矿。',
    'You manage to mine some gold.': '你成功开采了一些金矿。',
    'You manage to mine some silver.': '你成功开采了一些银矿。',
    'You manage to mine some mithril.': '你成功开采了一些秘银矿。',
    'You manage to mine some adamantite.': '你成功开采了一些精金矿。',
    'You manage to mine some runite.': '你成功开采了一些符文矿。',
    'There is currently no rocks available to mine.': '目前没有可以开采的岩石。',
    'There is no ore currently available in this rock.': '这块岩石中目前没有矿石。',
    'Your inventory is too full to hold any more ore.': '你的背包已满，无法容纳更多矿石。',

    // --- Fishing ---
    'You cast out your line...': '你抛出了鱼线...',
    'You attempt to catch a fish.': '你尝试捕鱼。',
    'You catch a shrimp.': '你抓到了一只虾。',
    'You catch a sardine.': '你抓到了一条沙丁鱼。',
    'You catch a herring.': '你抓到了一条鲱鱼。',
    'You catch an anchovy.': '你抓到了一条凤尾鱼。',
    'You catch a trout.': '你抓到了一条鳟鱼。',
    'You catch a salmon.': '你抓到了一条鲑鱼。',
    'You catch a tuna.': '你抓到了一条金枪鱼。',
    'You catch a lobster.': '你抓到了一只龙虾。',
    'You catch a swordfish.': '你抓到了一条旗鱼。',
    'Your inventory is too full to hold any more fish.': '你的背包已满，无法容纳更多鱼。',

    // --- Cooking ---
    'You cook the shrimp.': '你烹饪了虾。',
    'You accidentally burn the shrimp.': '你不小心把虾烧焦了。',
    'You cook the meat.': '你烹饪了肉。',
    'You accidentally burn the meat.': '你不小心把肉烧焦了。',
    'You successfully cook a pie.': '你成功烹饪了一个馅饼。',
    'You successfully bake a cake.': '你成功烤了一个蛋糕。',
    'You successfully bake some bread.': '你成功烤了一些面包。',
    'You accidentally burn the bread.': '你不小心把面包烧焦了。',

    // --- Firemaking ---
    "You can't light a fire here.": '你不能在这里生火。',
    'You need a tinderbox to light a fire.': '你需要火绒盒来生火。',
    'The fire catches and the logs begin to burn.': '火点着了，原木开始燃烧。',

    // --- Combat ---
    'You eat the shrimp.': '你吃了虾。',
    'You eat the bread.': '你吃了面包。',
    'You bury the bones.': '你埋葬了骨头。',
    'Oh dear, you are dead!': '天哪，你死了！',
    'You are dead.': '你死了。',

    // --- Movement & traversal ---
    'You climb down the ladder.': '你顺着梯子爬了下去。',
    'You climb up the ladder.': '你顺着梯子爬了上去。',
    'You climb the stairs.': '你走上了楼梯。',
    'You walk down the stairs.': '你走下了楼梯。',
    'You open the gate.': '你打开了大门。',
    'You close the gate.': '你关上了大门。',
    'You pull the lever...': '你拉动了拉杆...',
    'You slip and fall!': '你滑倒了！',
    'You fall!': '你掉下去了！',
    'You skillfully swing across.': '你灵巧地荡了过去。',
    '...You make it safely to the other side.': '...你安全到达了另一边。',
    '...you manage to cross safely.': '...你成功安全穿过了。',
    'You walk carefully across the slippery log...': '你小心翼翼地走过湿滑的木头...',
    'You decide to stay where you are.': '你决定留在原地。',

    // --- Inventory & items ---
    "You don't have enough space in your inventory to do that.": '你的背包没有足够的空间来做这件事。',
    'You do not have enough money.': '你没有足够的金币。',
    'You can only make that on a members\' server.': '你只能在会员服务器上制作那个。',
    'You are not a high enough level to use this item.': '你的等级不够高，无法使用此物品。',
    "That isn't your cannon!": '那不是你的大炮！',
    'I need the guards\' permission to do that.': '我需要得到卫兵的许可才能那样做。',

    // --- Smithing ---
    'You smelt the ore into a bar.': '你将矿石冶炼成了一根金属条。',
    'You hammer the metal and make a dagger.': '你锤打金属，制作了一把匕首。',

    // --- Thieving ---
    'You pick the pocket.': '你扒窃了口袋。',
    'You steal some coins.': '你偷到了一些金币。',
    'You fail to pick the pocket.': '你扒窃失败了。',
    'You have been stunned!': '你被击晕了！',

    // --- Prayer ---
    'You have run out of prayer points.': '你的祈祷点数已用完。',
    'Recharge at an altar, or drink a prayer potion.': '在祭坛充能，或喝一瓶祈祷药水。',

    // --- Quest ---
    'Congratulations! Quest complete!': '恭喜！任务完成！',
    'All quests have been completed.': '所有任务已完成。',

    // --- Bank ---
    'You deposit your items.': '你存入了物品。',
    'You withdraw your items.': '你取出了物品。',

    // --- Skills (additional) ---
    'You do not have an axe which you have the level to use.': '你没有达到等级要求的斧头。',
    'You need an axe to chop down this tree.': '你需要一把斧头来砍树。',
    'You do not have a pickaxe which you have the level to use.': '你没有达到等级要求的镐子。',
    'You need a pickaxe to mine this rock.': '你需要一把镐子来开采这块岩石。',
    'The pipe is being used': '这个管道正在被使用',
    'You must make a selection from both categories.': '你必须从两个类别中各选一项。',
    'You successfully cook a trout.': '你成功烹饪了鳟鱼。',
    'You successfully cook a salmon.': '你成功烹饪了鲑鱼。',
    'You successfully cook a lobster.': '你成功烹饪了龙虾。',
    'You successfully cook a swordfish.': '你成功烹饪了旗鱼。',
    'You successfully cook a tuna.': '你成功烹饪了金枪鱼。',
    'You roast the meat.': '你烤了肉。',
    'You manage to smelt a bronze bar.': '你成功冶炼了一根青铜条。',
    'You manage to smelt an iron bar.': '你成功冶炼了一根铁条。',
    'You manage to smelt a steel bar.': '你成功冶炼了一根钢条。',
    'You manage to smelt a gold bar.': '你成功冶炼了一根金条。',
    'You manage to smelt a silver bar.': '你成功冶炼了一根银条。',
    'You manage to smelt a mithril bar.': '你成功冶炼了一根秘银条。',
    'You retrieve a bar of iron.': '你取出了一根铁条。',
    'You retrieve a bar of bronze.': '你取出了一根青铜条。',
    'You retrieve a bar of steel.': '你取出了一根钢条。',
    'You spin the flax into a bow string.': '你把亚麻纺成了弓弦。',
    'You spin the wool into a ball of wool.': '你把羊毛纺成了毛线球。',

    // --- Interaction (additional) ---
    'The man seems to be in a weak state of mind.': '这个人似乎精神状态不太好。',
    "It's not after you...": '它不是在追你...',
    'The gem soon begins to fade.': '宝石很快开始褪色。',
    "The cog doesn't seem to fit.": '齿轮似乎不合适。',
    'Some earth falls down and fills in the fissure.': '一些泥土掉下来填满了裂缝。',
    'You search the crate but find nothing.': '你搜索了板条箱但什么也没找到。',
    'You search the sacks but find nothing.': '你搜索了麻袋但什么也没找到。',
    'You search the chest but find nothing.': '你搜索了箱子但什么也没找到。',
    'You manage to pick the lock - you find nothing of interest.': '你撬开了锁——但没发现什么有趣的东西。',
    'You cautiously peek inside the barrel...': '你小心翼翼地朝桶里看去...',
    'You open the door.': '你打开了门。',
    'You close the door.': '你关上了门。',
    'You go through the door.': '你走过了门。',
    'The gate opens.': '大门打开了。',
    'The gate is locked.': '大门被锁上了。',
    "The door won't open.": '门打不开。',
    "The door won't open. No one seems to be in.": '门打不开。里面似乎没有人。',
    'You fail to pick the lock.': '你撬锁失败了。',
    'You take a sip of the potion.': '你喝了一口药水。',
    'You open the trapdoor.': '你打开了活板门。',
    '...You make it safely to the other side.': '...你安全到达了另一边。',
    '...you manage to cross safely.': '...你成功安全穿过了。',
    'You walk carefully across the slippery log...': '你小心翼翼地走过湿滑的圆木...',
    'You carefully cross the bridge.': '你小心地过了桥。',
    'You squeeze through the gap in the fence.': '你挤过了栅栏的缝隙。',
    'You jump over the stile.': '你跳过了阶梯。',
    'You climb up the rocks.': '你爬上了岩石。',
    'You climb down the rocks.': '你爬下了岩石。',
    'You just barely make it across.': '你勉强过去了。',

    // --- Combat (additional) ---
    'You are poisoned!': '你中毒了！',
    'You have been poisoned!': '你已经中毒了！',
    "You can't attack this NPC.": '你不能攻击这个NPC。',
    'You are already under attack.': '你已经在战斗中了。',
    "I can't attack that.": '我不能攻击那个。',
    "I'm already under attack.": '我已经在战斗中了。',
    'Eating heals 3 hitpoints.': '进食恢复了3点生命值。',
    'It heals some health.': '它恢复了一些生命值。',

    // --- Inventory (additional) ---
    'Your inventory is too full to hold any more items.': '你的背包已满，无法容纳更多物品。',
    "You can't carry any more items.": '你不能携带更多物品了。',
    "You don't have enough inventory space.": '你没有足够的背包空间。',
    'You do not have enough coins.': '你没有足够的金币。',

    // --- Examine (common) ---
    'A heap of sacks.': '一堆麻袋。',
    'A pile of rocks.': '一堆岩石。',
    'A large table.': '一张大桌子。',
    'A wooden door.': '一扇木门。',
    'A very old looking door.': '一扇看起来很古老的门。',
    'A barrel of water.': '一桶水。',
    'A barrel full of finely sifted flour.': '一桶精细筛好的面粉。',
    'A large collection of books.': '一大堆书。',

    // --- Examine (high-frequency) ---
    'A clue!': '一条线索！',
    'A rocky outcrop.': '一片岩石露头。',
    "I hope there's treasure in it.": '我希望里面有宝藏。',
    'I can see fish swimming in the water.': '我能看到鱼在水中游动。',
    "It's closed.": '它是关着的。',
    'The door is closed.': '门是关着的。',
    'A deposit of rocks.': '一片矿石沉积。',
    'A wrought iron gate.': '一扇铸铁大门。',
    'This tree has been cut down.': '这棵树已经被砍倒了。',
    'A wooden gate.': '一扇木门。',
    "One of RuneScape's many citizens.": 'RuneScape 的众多居民之一。',
    "One of RuneScapes' many citizens.": 'RuneScape 的众多居民之一。',
    'I should try cooking this.': '我应该试试烹饪这个。',
    'I can climb this.': '我可以攀爬这个。',
    'I can climb down this.': '我可以从这里爬下去。',
    "It's open.": '它是开着的。',
    "I wonder what's inside.": '我想知道里面有什么。',
    "I wonder what's inside?": '我想知道里面有什么？',
    'A professional gnome baller.': '一位专业的地精球员。',
    'It actually smells quite good.': '闻起来其实挺不错的。',
    'A portal from this mystical place.': '来自这个神秘之地的传送门。',
    'A party balloon.': '一个派对气球。',
    'A finely balanced throwing knife.': '一把精心打造的飞刀。',
    'There is a powerful presence about these ruins...': '这些遗迹中有一股强大的力量...',
    "It's missing a handle.": '它缺了一个把手。',
    'A wooden crate for storage.': '一个用于储物的木箱。',
    'A mysterious power emanates from this shrine.': '一股神秘的力量从这个神殿中散发出来。',
    'A mysterious power emanates from the talisman...': '一股神秘的力量从护符中散发出来...',
    'Made from 100% real dragon hide.': '由100%真正的龙皮制成。',
    'I need a closer look to identify this.': '我需要仔细看看才能辨认出这个。',
    'Handy for boarding boats.': '方便上船。',
    'An enchanted ring.': '一枚附魔戒指。',
    'A silly pointed hat.': '一顶愚蠢的尖帽子。',
    'Useful for putting things on.': '用来放东西的。',
    'Oops!': '哎呀！',
    'I wonder what this does...': '我想知道这是干什么用的...',
    'A leafy bush.': '一丛茂密的灌木。',
    'This tree contains dangerous insects no doubt.': '这棵树里无疑有危险的昆虫。',
    'This needs refining.': '这个需要精炼。',
    'Stoney!': '石头！',
    'Perhaps I should search it.': '也许我应该搜索一下。',
    "It's only useful for firewood now.": '它现在只能当柴火了。',
    "It's a slightly magical stick.": '这是一根略带魔力的棍子。',
    'A tree commonly found in Runescape.': '一棵在 RuneScape 中常见的树。',
    'A large old oak tree.': '一棵又大又老的橡树。',
    'A weeping willow.': '一棵垂柳。',
    'This is a very old, very valuable yew tree.': '这是一棵非常古老、非常珍贵的紫杉。',
    'A very old yew tree.': '一棵非常古老的紫杉。',
    'A tree of considerable magical power.': '一棵拥有强大魔力的树。',
    'A large maple tree.': '一棵大枫树。',
    'Some sacks.': '一些麻袋。',
    'A small table.': '一张小桌子。',
    'A fireplace.': '一个壁炉。',
    'A rickety ladder.': '一把摇摇晃晃的梯子。',
    'A sturdy looking ladder.': '一把看起来很结实的梯子。',
    'A ladder leading up.': '一把向上的梯子。',
    'A ladder leading down.': '一把向下的梯子。',
    'A spiraling staircase.': '一段螺旋楼梯。',
    'A staircase leading up.': '一段向上的楼梯。',
    'A staircase leading down.': '一段向下的楼梯。',
    'The bank is open!': '银行开门了！',
    'A sturdy set of iron railings.': '一组坚固的铁栏杆。',
    'A small fishing net.': '一张小渔网。',
    'A fishing rod.': '一根钓鱼竿。',
    'A very sharp blade.': '一把非常锋利的刀刃。',
    'Some kind of staff.': '某种法杖。',
    'A strong looking bow.': '一把看起来很结实的弓。',
    'A very powerful wand.': '一根非常强大的魔杖。',
    'A very old amulet.': '一个非常古老的护符。',
    'A very shiny ring.': '一枚闪闪发光的戒指。',
    'Holy water in a vial.': '瓶装圣水。',
    'A warm welcoming fire.': '一堆温暖的篝火。',
    'Looks like it contains some sort of liquid.': '看起来里面装了某种液体。',
    'These are${apos} fresh bones.': '这些是新鲜的骨头。',
    'An altar to the gods.': '献给众神的祭坛。',
    'It looks heavy.': '它看起来很重。',
    'A very heavy looking anvil.': '一个看起来非常重的铁砧。',
    'Hot enough to cook on.': '足够热，可以用来烹饪。',
    'A very hot furnace.': '一个非常热的熔炉。',
    'A large spinning wheel.': '一台大纺车。',
    'Nicely crafted from local wood.': '用本地木材精心制作。',
    'A long seat.': '一把长凳。',
    'A plush cushioned throne.': '一把华丽的软垫王座。',
    'A place to rest.': '一个休息的地方。',
    'A well for collecting water.': '一口取水的井。',
    'A dusty old bookcase.': '一个积满灰尘的旧书架。',
    'Perhaps someone at the observatory can teach me to navigate?': '也许天文台的人可以教我导航？',
    'Spikey!': '扎人的！',

    // --- Shop (menus & messages) ---
    'Value': '估价',

    // --- Shop (names & UI) ---
    "Gerrant's Fishy Business.": '杰兰特渔具店',
    'Right-click on shop to buy item - Right-click on inventory to sell item': '右键点击商店物品购买 - 右键点击背包物品出售',
    "You can't sell this item to this shop.": '你不能把这个物品卖给这家商店。',
    "You can't buy this item.": '你不能购买这个物品。',
    'You feel weakened.': '你感到虚弱了。',
    "Lowe's Archery Emporium": '洛弓箭商城',
    "Bob's Brilliant Axes": '鲍勃的精品斧头店',
    "Zaff's Superior Staves!": '扎夫的高级法杖店！',
    "Thessalia's Fine Clothes.": '塞萨利亚的精品服装店',
    "Varrock Swordshop.": '瓦洛克剑店',
    "Varrock General Store.": '瓦洛克杂货店',
    "Horvik's Armour Shop.": '霍维克的盔甲店',
    "Rommik's Crafty Supplies.": '罗米克的制作用品店',
    "Nurmof's Pickaxe Shop.": '努尔莫夫的镐店',
    "Falador General Store.": '法拉多杂货店',
    "Flynn's Mace Market.": '弗林的锤市场',
    "Cassie's Shield Shop.": '卡西的盾牌店',
    "Wayne's Chains - Loss Prevention Specialists.": '韦恩锁链店',
    "Herquin's Gems.": '赫昆的宝石店',
    "General Store.": '杂货店',
    "Lumbridge General Store.": '伦布里奇杂货店',
    "Al Kharid General Store.": '阿尔卡里德杂货店',
    "Dommik's Crafting Store.": '多米克的制作商店',
    "Zeke's Superior Scimitars.": '泽克的高级弯刀店',
    "Louie's Armoured Legs Bazaar.": '路易的板腿集市',
    "Ranael's Super Skirt Store.": '拉奈尔的超级裙店',
    "Betty's Magic Emporium.": '贝蒂的魔法商城',
    "Brian's Battleaxe Bazaar.": '布莱恩的战斧集市',
    "Hickton's Archery Emporium.": '希克顿的弓箭商城',
    "Arhein's Store.": '阿赫因的商店',
    "Harry's Fishing Shop.": '哈利的渔具店',
    "Jatix's Herblore Shop.": '贾提克斯的草药店',
    "Gaius's Two Handed Shop.": '盖乌斯的双手武器店',
    "Peksa's Helmet Shop.": '佩克萨的头盔店',
    "Diango's Toy Store.": '迪安戈的玩具店',
    "Wydin's Food Store.": '威丁的食品店',

    // --- Report abuse ---
    'Report abuse': '举报滥用',
    'Close Window': '关闭窗口',
    'This form is for reporting players who are breaking our rules.': '此表单用于举报违反规则的玩家。',
    'Using it sends a snapshot of the last 60 secs of activity to us.': '提交后将发送最近60秒的活动记录。',
    'If you misuse this form, you will be banned.': '如果你滥用此表单，你将被封禁。',
    'First please enter the name of the offending player below:': '请先在下方输入违规玩家的名字:',
    'Then click below to indicate which of our 12 rules is being broken.': '然后点击下方选择违反了哪条规则。',
    'For a detailed explanation of each rule please read the manual on our website.': '如需了解每条规则的详细说明，请查阅官网手册。',
    '1: Offensive language': '1: 攻击性语言',
    '2: Item scamming': '2: 物品诈骗',
    '3: Password scamming': '3: 密码诈骗',
    '4: Bug abuse': '4: 利用漏洞',
    '5: Jagex staff impersonation': '5: 冒充官方人员',
    '6: Account sharing/trading': '6: 账号共享/交易',
    '7: Macroing': '7: 使用外挂/脚本',
    '8: Multiple logging in': '8: 多账号登录',
    '9: Encouraging others to break rules': '9: 煽动他人违规',
    '10: Misuse of customer support': '10: 滥用客服支持',
    '11: Advertising / website': '11: 广告/网站推广',
    '12: Real world item trading': '12: 现实交易游戏物品',

    // --- Music ---
    'You have not unlocked this piece of music yet!': '你还没有解锁这首音乐！',
    // Music track names
    'Adventure': '冒险',
    'Al Kharid': '阿尔卡里德',
    'Alone': '独行',
    'Ambient Jungle': '丛林氛围',
    'Arabian': '阿拉伯风情',
    'Arabian2': '阿拉伯风情2',
    'Arabian3': '阿拉伯风情3',
    'Arabique': '阿拉伯曲',
    'Army Of Darkness': '黑暗军团',
    'Arrival': '到来',
    'Attack1': '战斗1',
    'Attack2': '战斗2',
    'Attack3': '战斗3',
    'Attack4': '战斗4',
    'Attack5': '战斗5',
    'Attack6': '战斗6',
    'Attention': '戒备',
    'Autumn Voyage': '秋日之旅',
    'Background2': '背景曲2',
    'Ballad Of Enchantment': '魔法之歌',
    'Baroque': '巴洛克',
    'Beyond': '远方',
    'Big Chords': '大和弦',
    'Book Of Spells': '魔法之书',
    'Camelot': '卡默洛特',
    'Cave Background1': '洞穴背景曲',
    'Cavern': '洞窟',
    'Chain Of Command': '指挥链',
    'Crystal Cave': '水晶洞穴',
    'Crystal Sword': '水晶之剑',
    'Dangerous': '危险',
    'Dark2': '黑暗2',
    'Deep Wildy': '深层荒野',
    'Desert Voyage': '沙漠之旅',
    'Doorways': '门道',
    'Dream1': '梦境',
    'Dunjun': '地牢曲',
    'Egypt': '埃及',
    'Emotion': '情感',
    'Expanse': '广阔',
    'Expecting': '期待',
    'Faerie': '仙境',
    'Fanfare': '号角',
    'Fanfare2': '号角2',
    'Fanfare3': '号角3',
    'Flute Salad': '长笛沙拉',
    'Forever': '永恒',
    'Gaol': '牢狱',
    'Garden': '花园',
    'Gnome King': '地精之王',
    'Gnome Theme': '地精主题',
    'Gnome Village': '地精村庄',
    'Gnome Village2': '地精村庄2',
    'Gnomeball': '地精球',
    'Greatness': '伟大',
    'Harmony': '和谐',
    'High Seas': '远洋',
    'Horizon': '地平线',
    'Iban': '伊班',
    'In The Manor': '庄园之中',
    'Inspiration': '灵感',
    'Intrepid': '无畏',
    'Jolly-R': '快乐海盗',
    'Jungle Island': '丛林岛屿',
    'Jungly1': '丛林曲1',
    'Jungly2': '丛林曲2',
    'Jungly3': '丛林曲3',
    'Knightly': '骑士风范',
    'Lasting': '永恒之音',
    'Legion': '军团',
    'Lightness': '轻盈',
    'Lightwalk': '轻步',
    'Long Ago': '久远',
    'Long Way Home': '漫漫归途',
    'March2': '进行曲',
    'Lullaby': '摇篮曲',
    'Mage Arena': '法师竞技场',
    'Magic Dance': '魔法之舞',
    'Magical Journey': '魔法之旅',
    'Medieval': '中世纪',
    'Mellow': '柔和',
    'Miles Away': '千里之外',
    'Miracle Dance': '奇迹之舞',
    'Monarch Waltz': '君主华尔兹',
    'Moody': '忧郁',
    'Neverland': '梦幻岛',
    'Newbie Melody': '新手旋律',
    'Nightfall': '夜幕降临',
    'Oriental': '东方',
    'Overture': '序曲',
    'Parade': '游行',
    'Regal2': '皇家曲',
    'Reggae': '雷鬼',
    'Reggae2': '雷鬼2',
    'Riverside': '河畔',
    'Royale': '皇室',
    'Rune Essence': '符文精华',
    'Sad Meadow': '忧伤草地',
    'Scape Cave': '洞穴之歌',
    'Scape Main': '主题曲',
    'Scape Sad1': '悲伤之歌',
    'Scape Wild1': '荒野之歌',
    'Sea Shanty': '水手号子',
    'Sea Shanty2': '水手号子2',
    'Serenade': '小夜曲',
    'Serene': '宁静',
    'Shine': '闪耀',
    'Soundscape': '声景',
    'Spirit': '灵魂',
    'Splendour': '辉煌',
    'Spooky2': '阴森2',
    'Spooky Jungle': '阴森丛林',
    'Starlight': '星光',
    'Still Night': '寂静之夜',
    'The Desert': '沙漠',
    'The Shadow': '暗影',
    'The Tower': '高塔',
    'Trawler': '拖网渔船',
    'Trawler Minor': '小拖网曲',
    'Tree Spirits': '树灵',
    'Tribal Background': '部落背景曲',
    'Tribal': '部落',
    'Tribal2': '部落2',
    'Trinity': '三位一体',
    'Troubled': '困扰',
    'Underground': '地下',
    'Unknown Land': '未知之地',
    'Underground Pass': '地下通道',
    'Upcoming': '即将来临',
    'Venture': '冒险之旅',
    'Vision': '幻象',
    'Voodoo Cult': '巫毒教',
    'Voyage': '航行',
    'Wander': '漫步',
    'Waterfall': '瀑布',
    'Wilderness2': '荒野2',
    'Wilderness3': '荒野3',
    'Wilderness4': '荒野4',
    'Witching': '魔法时刻',
    'Wonder': '奇迹',
    'Wonderous': '奇妙',
    'Workshop': '工坊',
    'Start': '起始',
    'Talking Forest': '会说话的森林',
    'Expedition': '远征',
    'Emperor': '皇帝',
    'Scape Soft': '柔和之歌',
    'Yesteryear': '往昔',
    'Shining': '闪光',
    'Lonesome': '孤寂',
    'Tomorrow': '明天',
    'Duel Arena': '决斗竞技场',
    'Ice Melody': '冰之旋律',
    'Wolf Mountain': '狼山',
    'Harmony2': '和谐2',
    'Venture2': '冒险之旅2',
    'Landlubber': '旱鸭子',
    'Undercurrent': '暗流',
    'Zealot': '狂热者',
    'Cellar Song1': '地窖之歌',
    'Close Quarters': '近距离',
    'Heart and Mind': '心与智',
    'Nomad': '游牧者',
    'Chompy Hunt': '猎捕臃肿鸟',
    'Grumpy': '暴躁',
    'Forbidden': '禁忌',
    'Cursed': '被诅咒的',
    'Understanding': '领悟',
    'Stratosphere': '平流层',
    'Twilight': '暮光',
    'Mausoleum': '陵墓',
    'Village': '村庄',
    'Grotto': '石窟',
    'Natural': '自然',
    'Waterlogged': '浸水',
    'Stagnant': '死水',
    'Dead Quiet': '死寂',
};

// Entity name translations (items, NPCs, locations)
const ZH_NAMES: Record<string, string> = {
    // ===== Weapons =====
    'Bronze sword': '青铜剑',
    'Bronze dagger': '青铜匕首',
    'Bronze axe': '青铜斧',
    'Bronze pickaxe': '青铜镐',
    'Bronze mace': '青铜锤',
    'Bronze longsword': '青铜长剑',
    'Bronze scimitar': '青铜弯刀',
    'Bronze 2h sword': '青铜双手剑',
    'Bronze battleaxe': '青铜战斧',
    'Bronze warhammer': '青铜战锤',
    'Bronze halberd': '青铜戟',
    'Bronze spear': '青铜矛',
    'Iron sword': '铁剑',
    'Iron dagger': '铁匕首',
    'Iron axe': '铁斧',
    'Iron pickaxe': '铁镐',
    'Iron mace': '铁锤',
    'Iron longsword': '铁长剑',
    'Iron scimitar': '铁弯刀',
    'Iron 2h sword': '铁双手剑',
    'Iron battleaxe': '铁战斧',
    'Iron warhammer': '铁战锤',
    'Iron halberd': '铁戟',
    'Steel sword': '钢剑',
    'Steel dagger': '钢匕首',
    'Steel axe': '钢斧',
    'Steel pickaxe': '钢镐',
    'Steel mace': '钢锤',
    'Steel longsword': '钢长剑',
    'Steel scimitar': '钢弯刀',
    'Steel 2h sword': '钢双手剑',
    'Steel battleaxe': '钢战斧',
    'Steel warhammer': '钢战锤',
    'Steel halberd': '钢戟',
    'Mithril sword': '秘银剑',
    'Mithril dagger': '秘银匕首',
    'Mithril axe': '秘银斧',
    'Mithril pickaxe': '秘银镐',
    'Mithril scimitar': '秘银弯刀',
    'Adamant sword': '精金剑',
    'Adamant dagger': '精金匕首',
    'Adamant axe': '精金斧',
    'Adamant pickaxe': '精金镐',
    'Adamant scimitar': '精金弯刀',
    'Rune sword': '符文剑',
    'Rune dagger': '符文匕首',
    'Rune axe': '符文斧',
    'Rune pickaxe': '符文镐',
    'Rune scimitar': '符文弯刀',
    'Wooden shield': '木盾',
    'Bronze sq shield': '青铜方盾',
    'Bronze kiteshield': '青铜鸢盾',
    'Bronze med helm': '青铜中盔',
    'Bronze full helm': '青铜全盔',
    'Bronze chainbody': '青铜链甲',
    'Bronze platebody': '青铜板甲',
    'Bronze platelegs': '青铜板腿',
    'Bronze plateskirt': '青铜板裙',
    'Iron sq shield': '铁方盾',
    'Iron kiteshield': '铁鸢盾',
    'Iron med helm': '铁中盔',
    'Iron full helm': '铁全盔',
    'Iron chainbody': '铁链甲',
    'Iron platebody': '铁板甲',
    'Iron platelegs': '铁板腿',
    'Iron plateskirt': '铁板裙',
    'Steel med helm': '钢中盔',
    'Steel full helm': '钢全盔',
    'Steel chainbody': '钢链甲',
    'Steel platebody': '钢板甲',
    'Steel platelegs': '钢板腿',

    // ===== Ranged =====
    'Shortbow': '短弓',
    'Longbow': '长弓',
    'Oak shortbow': '橡木短弓',
    'Oak longbow': '橡木长弓',
    'Willow shortbow': '柳木短弓',
    'Willow longbow': '柳木长弓',
    'Bronze arrows': '青铜箭',
    'Iron arrows': '铁箭',
    'Steel arrows': '钢箭',
    'Arrow shaft': '箭杆',
    'Headless arrow': '无头箭',
    'Bronze arrowtips': '青铜箭头',
    'Iron arrowtips': '铁箭头',
    'Feather': '羽毛',

    // ===== Tools =====
    'Hammer': '锤子',
    'Chisel': '凿子',
    'Needle': '针',
    'Knife': '小刀',
    'Tinderbox': '火绒盒',
    'Bucket': '水桶',
    'Pot': '罐子',
    'Jug': '水壶',
    'Bowl': '碗',
    'Shears': '剪刀',
    'Spade': '铲子',
    'Rope': '绳子',

    // ===== Fishing =====
    'Small fishing net': '小渔网',
    'Fishing rod': '钓鱼竿',
    'Fly fishing rod': '飞蝇钓竿',
    'Harpoon': '鱼叉',
    'Lobster pot': '龙虾笼',
    'Fishing bait': '鱼饵',

    // ===== Food (raw) =====
    'Raw shrimp': '生虾',
    'Raw sardine': '生沙丁鱼',
    'Raw herring': '生鲱鱼',
    'Raw anchovies': '生凤尾鱼',
    'Raw trout': '生鳟鱼',
    'Raw salmon': '生鲑鱼',
    'Raw tuna': '生金枪鱼',
    'Raw lobster': '生龙虾',
    'Raw swordfish': '生旗鱼',
    'Raw chicken': '生鸡肉',
    'Raw beef': '生牛肉',

    // ===== Food (cooked) =====
    'Shrimp': '虾',
    'Sardine': '沙丁鱼',
    'Herring': '鲱鱼',
    'Anchovies': '凤尾鱼',
    'Trout': '鳟鱼',
    'Salmon': '鲑鱼',
    'Tuna': '金枪鱼',
    'Lobster': '龙虾',
    'Swordfish': '旗鱼',
    'Cooked chicken': '熟鸡肉',
    'Cooked meat': '熟肉',
    'Bread': '面包',
    'Cake': '蛋糕',
    'Pie': '馅饼',
    'Kebab': '烤肉串',

    // ===== Food (burnt) =====
    'Burnt shrimp': '烧焦的虾',
    'Burnt meat': '烧焦的肉',
    'Burnt bread': '烧焦的面包',

    // ===== Logs =====
    'Logs': '原木',
    'Oak logs': '橡木原木',
    'Willow logs': '柳木原木',
    'Maple logs': '枫木原木',
    'Yew logs': '紫杉原木',
    'Magic logs': '魔法原木',

    // ===== Ores & Bars =====
    'Copper ore': '铜矿石',
    'Tin ore': '锡矿石',
    'Iron ore': '铁矿石',
    'Coal': '煤矿',
    'Gold ore': '金矿石',
    'Silver ore': '银矿石',
    'Mithril ore': '秘银矿石',
    'Adamantite ore': '精金矿石',
    'Runite ore': '符文矿石',
    'Bronze bar': '青铜条',
    'Iron bar': '铁条',
    'Steel bar': '钢条',
    'Gold bar': '金条',
    'Silver bar': '银条',
    'Mithril bar': '秘银条',
    'Adamantite bar': '精金条',
    'Runite bar': '符文条',

    // ===== Gems =====
    'Uncut opal': '未切割蛋白石',
    'Uncut jade': '未切割翡翠',
    'Uncut sapphire': '未切割蓝宝石',
    'Uncut emerald': '未切割祖母绿',
    'Uncut ruby': '未切割红宝石',
    'Uncut diamond': '未切割钻石',
    'Opal': '蛋白石',
    'Jade': '翡翠',
    'Sapphire': '蓝宝石',
    'Emerald': '祖母绿',
    'Ruby': '红宝石',
    'Diamond': '钻石',

    // ===== Runes =====
    'Air rune': '风符文',
    'Water rune': '水符文',
    'Earth rune': '土符文',
    'Fire rune': '火符文',
    'Mind rune': '心灵符文',
    'Body rune': '身体符文',
    'Chaos rune': '混沌符文',
    'Death rune': '死亡符文',
    'Nature rune': '自然符文',
    'Law rune': '法律符文',
    'Cosmic rune': '宇宙符文',

    // ===== Other items =====
    'Coins': '金币',
    'Bones': '骨头',
    'Big bones': '大骨头',
    'Cowhide': '牛皮',
    'Leather': '皮革',
    'Hard leather': '硬皮革',
    'Thread': '线',
    'Ball of wool': '毛线球',
    'Wool': '羊毛',
    'Flour': '面粉',
    'Grain': '谷物',
    'Egg': '鸡蛋',
    'Milk': '牛奶',
    'Potato': '土豆',
    'Cabbage': '卷心菜',
    'Onion': '洋葱',
    'Tomato': '番茄',
    'Cheese': '奶酪',
    'Jug of water': '一壶水',
    'Bucket of water': '一桶水',
    'Pot of flour': '一罐面粉',
    'Amulet mould': '护符模具',
    'Necklace mould': '项链模具',
    'Ring mould': '戒指模具',
    'Holy symbol mould': '圣符模具',

    // ===== Trees (locations) =====
    'Tree': '树',
    'Oak': '橡树',
    'Willow': '柳树',
    'Maple tree': '枫树',
    'Yew': '紫杉',
    'Magic tree': '魔法树',
    'Tree stump': '树桩',

    // ===== Rocks =====
    'Rocks': '岩石',
    'Copper rock': '铜矿岩',
    'Tin rock': '锡矿岩',
    'Iron rock': '铁矿岩',
    'Coal rock': '煤矿岩',
    'Gold rock': '金矿岩',
    'Silver rock': '银矿岩',
    'Mithril rock': '秘银矿岩',
    'Adamantite rock': '精金矿岩',
    'Empty rock': '空岩石',

    // ===== Locations =====
    'Door': '门',
    'Gate': '大门',
    'Ladder': '梯子',
    'Staircase': '楼梯',
    'Bank booth': '银行柜台',
    'Furnace': '熔炉',
    'Anvil': '铁砧',
    'Range': '灶台',
    'Cooking range': '烹饪灶台',
    'Spinning wheel': '纺车',
    'Altar': '祭坛',
    'Well': '水井',
    'Chest': '箱子',
    'Crate': '板条箱',
    'Barrel': '木桶',
    'Table': '桌子',
    'Chair': '椅子',
    'Bookcase': '书架',
    'Bed': '床',
    'Fire': '火堆',

    // ===== NPCs =====
    'Man': '男人',
    'Woman': '女人',
    'Guard': '卫兵',
    'Banker': '银行家',
    'Shop keeper': '店主',
    'Shopkeeper': '店主',
    'Cook': '厨师',
    'Chicken': '鸡',
    'Cow': '牛',
    'Goblin': '哥布林',
    'Rat': '老鼠',
    'Giant rat': '巨型老鼠',
    'Spider': '蜘蛛',
    'Giant spider': '巨型蜘蛛',
    'Imp': '小鬼',
    'Skeleton': '骷髅',
    'Zombie': '僵尸',
    'Ghost': '幽灵',
    'Fishing spot': '钓鱼点',
    'Hans': '汉斯',
    'Father Aereck': '艾雷克神父',
    'Duke Horacio': '霍拉西奥公爵',
    'Bob': '鲍勃',
    'Lumbridge Guide': '伦布里奇向导',
    'RuneScape Guide': 'RuneScape 向导',
    'Survival Expert': '生存专家',
    'Master Chef': '大厨',
    'Quest Guide': '任务向导',
    'Mining Instructor': '采矿教官',
    'Combat Instructor': '战斗教官',
    'Financial Advisor': '财务顾问',
    'Brother Brace': '布雷斯兄弟',
    'Magic Instructor': '魔法教官',
    'Butterfly': '蝴蝶',

    // ===== NPCs - Quest & Story =====
    'King Roald': '罗尔德国王',
    'King Arthur': '亚瑟王',
    'King Lathas': '拉瑟斯国王',
    'King Narnode Shareen': '纳诺德·沙林国王',
    'King Bolren': '博尔伦国王',
    'King Percival': '珀西瓦尔国王',
    'Prince Ali': '阿里王子',
    'Sir Amik Varze': '阿米克·瓦尔泽爵士',
    'Sir Prysin': '普莱辛爵士',
    'Sir Vyvin': '维温爵士',
    'Sir Kay': '凯爵士',
    'Sir Lancelot': '兰斯洛特爵士',
    'Sir Gawain': '高文爵士',
    'Sir Bedivere': '贝迪维尔爵士',
    'Sir Lucan': '卢坎爵士',
    'Sir Mordred': '莫德雷德爵士',
    'Sir Palomedes': '帕洛梅德斯爵士',
    'Sir Pelleas': '佩利亚斯爵士',
    'Sir Percival': '珀西瓦尔爵士',
    'Sir Tristram': '特里斯坦爵士',
    'Sir Carl': '卡尔爵士',
    'Sir Harry': '哈里爵士',
    'Sir Jerro': '杰罗爵士',
    'Romeo': '罗密欧',
    'Juliet': '朱丽叶',
    'Merlin': '梅林',
    'Morgan Le Faye': '摩根勒菲',
    'Delrith': '德尔里斯',
    'Elvarg': '艾尔瓦格',
    'Ernest': '欧尼斯特',
    'Veronica': '维罗妮卡',
    'Professor Oddenstein': '奥登斯坦教授',
    'Restless ghost': '不安的幽灵',
    'Oziach': '奥齐亚奇',
    'Oracle': '神谕者',
    'Ned': '内德',
    'Wormbrain': '虫脑',
    'Traiborn': '特雷伯恩',
    'Reldo': '雷尔多',
    'Aubury': '奥伯里',
    'Sedridor': '塞德里多',

    // ===== NPCs - Towns & Services =====
    'Bartender': '酒保',
    'Barman': '酒吧老板',
    'Barmaid': '酒吧女招待',
    'Farmer': '农夫',
    'Fisherman': '渔夫',
    'Monk': '僧侣',
    'Priest': '牧师',
    'Wizard': '巫师',
    'Knight': '骑士',
    'Paladin': '圣骑士',
    'Hero': '英雄',
    'Thief': '盗贼',
    'Beggar': '乞丐',
    'Tramp': '流浪汉',
    'Barbarian': '野蛮人',
    'Barbarian woman': '野蛮人女性',
    'Warrior': '战士',
    'Warrior woman': '女战士',
    'White Knight': '白骑士',
    'Black Knight': '黑骑士',
    'Dark wizard': '黑暗巫师',
    'Dark warrior': '黑暗战士',
    'Mugger': '劫匪',
    'Highwayman': '拦路强盗',
    'Pirate': '海盗',
    'Dwarf': '矮人',
    'Gnome': '地精',
    'Druid': '德鲁伊',
    'Tanner': '皮匠',
    'Hairdresser': '理发师',
    'Nurse Sarah': '莎拉护士',
    'Apothecary': '药剂师',
    'Make-over mage': '变装法师',
    'Doric': '多里克',
    'Thessalia': '塞萨利亚',
    'Zaff': '扎夫',
    'Lowe': '洛',
    'Horvik': '霍维克',
    'Zeke': '泽克',
    'Ranael': '拉奈尔',
    'Louie legs': '路易',
    'Flynn': '弗林',
    'Wydin': '威丁',
    'Diango': '迪安戈',
    'Betty': '贝蒂',
    'Brian': '布莱恩',
    'Cassie': '卡西',
    'Herquin': '赫昆',
    'Rommik': '罗米克',
    'Nurmof': '努尔莫夫',
    'Gerrant': '杰兰特',
    'Hickton': '希克顿',
    'Arhein': '阿赫因',
    'Harry': '哈利',
    'Jatix': '贾提克斯',
    'Gaius': '盖乌斯',
    'Peksa': '佩克萨',
    'Valaine': '瓦莱恩',
    'Scavvo': '斯卡沃',
    'Grum': '格鲁姆',
    'Davon': '达冯',

    // ===== NPCs - Lumbridge & Surroundings =====
    'Fred the Farmer': '农夫弗雷德',
    'Father Lawrence': '劳伦斯神父',
    'Father Urhney': '乌尔尼神父',
    'Lumbridge Guide': '伦布里奇向导',
    'Gertrude': '格特鲁德',

    // ===== NPCs - Varrock =====
    'Curator': '馆长',
    'Baraek': '巴雷克',
    'Katrine': '卡特琳',
    'Straven': '斯特拉文',
    'Jonny the beard': '大胡子乔尼',
    'Charlie the cook': '厨师查理',
    'Dr Harlow': '哈洛博士',
    'Gypsy': '吉普赛人',
    'Osman': '奥斯曼',
    'Hassan': '哈桑',
    'Leela': '莉拉',
    'Lady Keli': '凯莉夫人',

    // ===== NPCs - Falador =====
    'Squire': '侍从',
    'Captain Rovin': '罗文队长',
    'Thurgo': '瑟戈',
    'Drunken Dwarf': '醉酒矮人',
    'Hetty': '赫蒂',
    'Aggie': '阿吉',

    // ===== NPCs - Ardougne =====
    'Elena': '艾琳娜',
    'Edmond': '埃德蒙',
    'Bravek': '布雷维克',
    'Mourner': '哀悼者',
    'Head mourner': '哀悼者首领',
    'Jerico': '杰里科',

    // ===== NPCs - Camelot & Seers =====
    'Galahad': '加拉哈德',
    'Seer': '先知',

    // ===== NPCs - Monsters =====
    'Bear': '熊',
    'Wolf': '狼',
    'White wolf': '白狼',
    'Dog': '狗',
    'Unicorn': '独角兽',
    'Black unicorn': '黑独角兽',
    'Scorpion': '蝎子',
    'Snake': '蛇',
    'Bat': '蝙蝠',
    'Giant bat': '巨型蝙蝠',
    'Hobgoblin': '大哥布林',
    'Moss giant': '苔藓巨人',
    'Ice giant': '冰巨人',
    'Fire giant': '火巨人',
    'Ice warrior': '冰战士',
    'Lesser demon': '低等恶魔',
    'Greater demon': '高等恶魔',
    'Black Demon': '黑暗恶魔',
    'Blue dragon': '蓝龙',
    'Red dragon': '红龙',
    'Green dragon': '绿龙',
    'Black dragon': '黑龙',
    'Baby blue dragon': '蓝龙幼崽',
    'King black dragon': '黑龙之王',
    'Hellhound': '地狱犬',
    'Earth warrior': '大地战士',
    'Chaos druid': '混沌德鲁伊',
    'Chaos dwarf': '混沌矮人',
    'Ogre': '食人魔',
    'Troll': '巨魔',
    'Cyclops': '独眼巨人',
    'Giant': '巨人',
    'Ghast': '怨灵',
    'Shade': '暗影',
    'Mummy': '木乃伊',
    'Jogre': '丛林食人魔',
    'Duck': '鸭子',
    'Duckling': '小鸭子',
    'Rooster': '公鸡',
    'Camel': '骆驼',
    'Monkey': '猴子',
    'Cat': '猫',
    'Kitten': '小猫',
    'Sheep': '绵羊',
    'Mouse': '老鼠',
    'Penguin': '企鹅',
    'Gull': '海鸥',
    'Swarm': '虫群',

    // ===== NPCs - Al Kharid =====
    'Ali Morrisane': '阿里·莫里桑',
    'Silk trader': '丝绸商人',
    'Gem trader': '宝石商人',
    'Kebab seller': '烤肉串商人',
    'Customs officer': '海关官员',

    // ===== NPCs - Gnome =====
    'Gnome child': '地精孩子',
    'Gnome guard': '地精卫兵',
    'Gnome banker': '地精银行家',
    'Gnome pilot': '地精飞行员',
    'Gnome trainer': '地精教练',
    'Gnome woman': '地精女性',
    'Gnome shop keeper': '地精店主',
    'Glough': '格拉夫',
    'Hazelmere': '黑泽米尔',

    // ===== NPCs - Tutorial & Guide =====
    'Shop assistant': '店员',
    'Soldier': '士兵',
    'Boy': '男孩',
    'Child': '孩子',
    'Fairy': '仙女',
    'Fairy Queen': '仙女女王',
    'Genie': '灯神',
    'Mysterious Old Man': '神秘老人',
    'Leprechaun': '妖精',

    // ===== NPCs - Other Named =====
    'Count Draynor': '德雷诺伯爵',
    'Ice Queen': '冰雪女王',
    'Lucien': '卢西恩',
    'Hazeel': '哈泽尔',
    'General Khazard': '卡扎德将军',
    'Tree spirit': '树灵',
    'River troll': '河流巨魔',
    'Monk of Zamorak': '扎莫拉克僧侣',
    'Monk of Entrana': '恩特拉纳僧侣',
    'Captain Barnaby': '巴纳比船长',
    'Captain Tobias': '托比亚斯船长',
    'Drezel': '德雷泽尔',
    'Nora T. Hagg': '诺拉·T·哈格',
    'Sanfew': '桑弗',
    'Kaqemeex': '卡科梅克斯',
    'Thormac': '索马克',
    'Guild master': '公会大师',
    'Dimintheis': '迪明赛斯',
    'Zoo keeper': '动物园管理员',
    'Party Pete': '派对皮特',

    // ===== NPCs - Fishing & Sea =====
    'Murphy': '墨菲',
    'Master fisher': '钓鱼大师',

    // ===== NPCs - Crafting & Skills =====
    'Master crafter': '制作大师',
    ' Master crafter': '制作大师',
    'Leatherworker': '皮匠',

    // ===== NPCs - Missing (batch) =====
    // --- Generic / Common ---
    'Archer': '弓箭手',
    'Baker': '面包师',
    'Bandit': '强盗',
    'Border Guard': '边境守卫',
    'Clerk': '文员',
    'Foreman': '工头',
    'Forester': '护林员',
    'Peasant': '农民',
    'Recruiter': '招募员',
    'Rogue': '游侠',
    'Slave': '奴隶',
    'Male slave': '男奴隶',
    'Female slave': '女奴隶',
    'Escaping slave.': '逃跑的奴隶',
    'Student': '学生',
    'Thug': '暴徒',
    'Watchman': '守望者',
    'Head chef': '主厨',
    'Head Thief': '盗贼头目',
    'High Priest': '大祭司',
    'Door man': '看门人',
    'Cheerleader': '啦啦队员',
    'Chemist': '化学家',
    'City guard': '城市卫兵',
    'Civillian': '平民',
    'Local': '当地人',
    'Examiner': '考官',
    'Mercenary': '雇佣兵',
    'Mercenary Captain': '雇佣兵队长',
    'Necromancer': '死灵法师',
    'Dark mage': '黑暗法师',
    'Battle mage': '战斗法师',
    'Cave monk': '洞穴僧侣',
    'Barbarian guard': '野蛮人守卫',
    'Goblin guard': '哥布林守卫',
    'Enclave guard': '飞地守卫',
    'Fortress Guard': '要塞守卫',
    'Tower guard': '塔楼守卫',
    'Tower Archer': '塔楼弓箭手',
    'Tower Advisor': '塔楼顾问',
    'Pirate Guard': '海盗守卫',
    'Guard Bandit': '守卫强盗',
    'Guard dog': '看门犬',
    'Jail guard': '狱卒',
    'Jailer': '狱卒',
    'Rowdy Guard': '粗暴守卫',
    'Rowdy slave': '粗暴奴隶',
    'Fightslave': '角斗奴隶',

    // --- Shops & Services ---
    'Armour salesman': '盔甲商人',
    'Bow and Arrow salesman': '弓箭商人',
    'Candle maker': '蜡烛匠',
    'Fancy dress shop owner': '化装服店主',
    'Fairy shop assistant': '仙女店员',
    'Fairy shop keeper': '仙女店主',
    'Fur trader': '毛皮商人',
    'Gem merchant': '宝石商人',
    'Magic Store owner': '魔法商店老板',
    'Poison Salesman': '毒药商人',
    'Silk merchant': '丝绸商人',
    'Silver merchant': '白银商人',
    'Spice seller': '香料商人',
    'Tea seller': '茶叶商人',
    'Ticket Merchant': '票务商人',
    'Tribal Weapon Salesman': '部落武器商人',
    'Weapon poison salesman': '武器毒药商人',
    'Weaponsmaster': '武器大师',
    'Ogre merchant': '食人魔商人',
    'Ogre trader': '食人魔商贩',

    // --- Monsters & Creatures ---
    'Air elemental': '风元素',
    'Earth elemental': '大地元素',
    'Fire elemental': '火元素',
    'Water elemental': '水元素',
    'Baby dragon': '幼龙',
    'Big Wolf': '大狼',
    'Desert Wolf': '沙漠狼',
    'Jungle Wolf': '丛林狼',
    'Chompy bird': '臃肿鸟',
    'Dead tree': '枯树',
    'Deadly red spider': '致命红蜘蛛',
    'Poison spider': '毒蜘蛛',
    'Jungle spider': '丛林蜘蛛',
    'Shadow spider': '暗影蜘蛛',
    'Ice spider': '冰蜘蛛',
    'Blessed spider': '受祝福的蜘蛛',
    'Poison Scorpion': '毒蝎',
    'King Scorpion': '蝎王',
    'Grave Scorpion': '墓穴蝎',
    'Pit Scorpion': '深坑蝎',
    'Kharid Scorpion': '卡里德蝎',
    'Khazard Scorpion': '卡扎德蝎',
    'Death wing': '死亡之翼',
    'Dungeon rat': '地牢老鼠',
    'Blessed Giant rat': '受祝福的巨型老鼠',
    'Bloated Toad': '膨胀蟾蜍',
    'Swamp toad': '沼泽蟾蜍',
    'Fly trap': '捕蝇草',
    'Golem': '魔像',
    'Rock Golem': '岩石魔像',
    'Dryad': '树精灵',
    'Skeleton Mage': '骷髅法师',
    'Shadow warrior': '暗影战士',
    'Orc': '兽人',
    'Mammoth': '猛犸象',
    'Shark': '鲨鱼',
    'Sea slug': '海蛞蝓',
    'Oomlie Bird': '奥姆利鸟',
    'Savage bird': '野蛮鸟',
    'Terrorbird': '恐鸟',
    'Mounted terrorbird gnome': '骑恐鸟的地精',
    'Cormorant': '鸬鹚',
    'Albatross': '信天翁',
    'Overgrown cat': '成年猫',
    'Gertrudes cat': '格特鲁德的猫',
    'Witches cat': '女巫的猫',
    'Sinclair Guard dog': '辛克莱尔看门犬',
    'Yeti': '雪人',
    'Lizard man': '蜥蜴人',
    'Strange plant': '奇怪的植物',
    'Summoned Zombie': '召唤僵尸',
    'Undead One': '不死者',
    'Magic axe': '魔法斧',
    'Suit of armour': '盔甲套装',
    'Big fish': '大鱼',
    'Half-Souless': '半灵魂体',
    'Souless': '无灵魂体',
    'Brownie': '小妖精',
    'Boulder': '巨石怪',
    'Bouncer': '弹跳者',
    'Ugthanki': '乌格坦奇骆驼',
    'Wolfman': '狼人',
    'Wolfwoman': '女狼人',

    // --- Ogres ---
    'Ogre chieftain': '食人魔酋长',
    'Ogre guard': '食人魔守卫',
    'Ogre shaman': '食人魔萨满',
    'Khazard Ogre': '卡扎德食人魔',

    // --- Gnomes ---
    'Gnome Waiter': '地精服务员',
    'Gnome ball referee': '地精球裁判',
    'Gnome baller': '地精球员',
    'Gnome troop': '地精部队',
    'Gnome winger': '地精边锋',
    'Local Gnome': '当地地精',

    // --- Khazard ---
    'Khazard Guard': '卡扎德守卫',
    'Khazard barman': '卡扎德酒保',
    'Khazard commander': '卡扎德指挥官',
    'Khazard trooper': '卡扎德士兵',
    'Khazard warlord': '卡扎德军阀',

    // --- Quest NPCs: Named Characters ---
    'A Sinister Stranger': '一个阴险的陌生人',
    "A'abla": '阿布拉',
    'Abbot Langley': '兰利修道院长',
    'Achietties': '阿奇提斯',
    'Aemad': '阿马德',
    'Afrah': '阿弗拉',
    'Al Shabim.': '阿尔·沙比姆',
    'Al-Kharid warrior': '阿尔卡里德战士',
    'Alfonse the waiter': '服务员阿方斯',
    'Almera': '阿尔梅拉',
    'Alomone': '阿洛蒙',
    'Alrena': '阿尔蕾娜',
    'Aluft Gianne': '阿卢夫特·吉安内',
    'Ana': '安娜',
    'Anita': '安妮塔',
    'Anna': '安娜',
    'Archaeological expert': '考古专家',
    'Bailey': '贝利',
    'Barker': '巴克尔',
    'Bedabin Nomad': '贝达宾游牧民',
    'Bedabin Nomad Guard': '贝达宾游牧民守卫',
    'Big Dave': '大戴夫',
    'Billy Rehnison': '比利·雷尼森',
    'Black Heather': '黑石楠',
    'Black Knight Titan': '黑骑士泰坦',
    'Blurberry': '布鲁贝里',
    'Bolkoy': '博尔科伊',
    'Bonzo': '邦佐',
    'Boot': '布特',
    'Brimstail': '布林姆泰尔',
    'Brother Cedric': '塞德里克兄弟',
    'Brother Jered': '杰雷德兄弟',
    'Brother Kojo': '科乔兄弟',
    'Brother Omad': '奥马德兄弟',
    'Bugs': '巴格斯',
    'Butler Jones': '管家琼斯',
    'Cabin Boy Jenkins': '船舱男孩詹金斯',
    'Caleb': '卡勒布',
    'Captain Shanks': '尚克斯船长',
    'Captain Siad': '西亚德船长',
    'Carla': '卡拉',
    'Carol': '卡罗尔',
    'Caroline': '卡罗琳',
    'Ceril Carnillean': '塞里尔·卡尼利安',
    'Chamber guardian': '密室守卫',
    'Chancy': '昌西',
    'Chaos druid warrior': '混沌德鲁伊战士',
    'Charlie': '查理',
    'Chronozon': '克罗诺佐恩',
    'Chuck': '查克',
    'Claus the chef': '厨师克劳斯',
    'Clivet': '克利维特',
    'Colonel Radick': '拉迪克上校',
    'Commander Montai': '蒙泰指挥官',
    'Competition Judge': '比赛裁判',
    'Councillor Halgrive': '议员哈尔格里夫',
    'Crate': '板条箱',
    'Crone': '老妇人',
    'Dalal': '达拉尔',
    'David': '大卫',
    'DeVinci': '达·芬奇',
    'Digsite workman': '挖掘场工人',
    'Diseased sheep': '病羊',
    'Doctor Orbon': '奥尔本医生',
    'Dommik': '多米克',
    'Donny the lad': '小伙子唐尼',
    'Donovan the Family Handyman': '家族杂工多诺万',
    'Doomion': '杜米恩',
    'Drogo dwarf': '德罗戈矮人',
    'Dwarf Commander': '矮人指挥官',
    'Dwarf youngster': '矮人青年',
    'Echned Zekin': '艾赫内德·泽金',
    'Elizabeth': '伊丽莎白',
    'Elkoy': '埃尔科伊',
    'Entrana Fire Bird': '恩特拉纳火鸟',
    'Fadli': '法德利',
    'Farmer Brumty': '农夫布鲁姆提',
    'Fat tony': '胖子托尼',
    'Femi': '费米',
    'Fernahei': '费纳黑',
    'Fidelio': '菲德里奥',
    'Filliman Tarlock': '菲利曼·塔洛克',
    'Fionella': '菲奥内拉',
    'Fire Warrior of Lesarkus': '莱萨库斯的火战士',
    'Flynn': '弗林',
    'Frank': '弗兰克',
    'Frenita': '弗蕾妮塔',
    'Frincos': '弗林科斯',
    'Fycie': '法伊西',
    'Garv': '加尔夫',
    'General Bentnoze': '弯鼻将军',
    'General Wartface': '疣脸将军',
    'Gerald': '杰拉尔德',
    'Golrie': '戈尔里',
    'Gorad': '戈拉德',
    'Gossip': '八卦者',
    'Grail Maiden': '圣杯少女',
    'Grandpa Jack': '杰克爷爷',
    'Greldo': '格雷尔多',
    'Grew': '格鲁',
    'Grip': '格里普',
    'Grubor': '格鲁伯',
    'Guardian of Armadyl': '阿玛迪尔守护者',
    'Guidor': '吉多尔',
    "Guidor's wife": '吉多尔的妻子',
    'Gujuo': '古卓',
    'Gulluck': '古鲁克',
    'Gundai': '贡戴',
    'Gunnjorn': '贡乔恩',
    'Gunthor the brave': '勇者贡索尔',
    'Hadley': '哈德利',
    'Hajedy': '哈杰迪',
    'Hamid': '哈米德',
    'Hazeel Cultist': '哈泽尔邪教徒',
    'Heckel Funch': '赫克尔·芬奇',
    'Helemos': '赫勒摩斯',
    'Hengrad': '亨格拉德',
    'Henryeta Carnillean': '亨丽埃塔·卡尼利安',
    'Hobbes': '霍布斯',
    'Holgart': '霍尔加特',
    'Holthion': '霍尔西恩',
    'Hops': '霍普斯',
    'Horacio': '霍拉西奥',
    'Hudo': '胡多',
    'Hudon': '胡顿',
    'Iban disciple': '伊班门徒',
    'Ima': '伊玛',
    'Invrigar the Necromancer': '死灵法师因弗里加',
    'Irena': '伊蕾娜',
    'Irksol': '伊尔克索尔',
    'Irvig Senay': '伊尔维格·塞内',
    'Jadid': '贾迪德',
    'Jakut': '贾库特',
    'Jaraah': '贾拉赫',
    'Jeed': '吉德',
    'Jeremy Servil': '杰瑞米·瑟维尔',
    'Jethick': '杰西克',
    'Jiminua': '吉米努亚',
    'Joe': '乔',
    'Johnathon': '约翰纳森',
    'Joshua': '约书亚',
    'Jungle Forester': '丛林护林员',
    'Jungle Savage': '丛林野人',
    'Justin Servil': '贾斯汀·瑟维尔',
    'Kaleb Paramaya': '卡勒布·帕拉马亚',
    'Kalrag': '卡尔拉格',
    'Kalron': '卡尔隆',
    'Kamen': '卡门',
    'Kanel': '卡内尔',
    'Kangai Mau': '坎盖·毛',
    'Kardia': '卡迪亚',
    'Kelvin': '凯尔文',
    'Kennith': '肯尼斯',
    'Kent': '肯特',
    'Kilron': '基尔隆',
    'Klank': '克兰克',
    'Klarense': '克拉伦斯',
    'Knight of Ardougne': '阿多格尼骑士',
    'Koftik': '科夫提克',
    'Kolodion': '科洛迪恩',
    'Kortan': '科尔坦',
    'Lady Servil': '瑟维尔夫人',
    'Legends Guard': '传说守卫',
    'Lord Daquarius': '达夸里乌斯领主',
    'Lord Iban': '伊班领主',
    'Louisa': '路易莎',
    'Lucy': '露西',
    'Lundail': '伦戴尔',
    'Lunderwin': '伦德温',
    'Luthas': '卢萨斯',
    'Mad skavid': '疯狂斯卡维德',
    'Scared skavid': '害怕的斯卡维德',
    'Skavid': '斯卡维德',
    'Martha Rehnison': '马莎·雷尼森',
    'Mary': '玛丽',
    'Megan': '梅根',
    'Melzar the mad': '疯子梅尔扎',
    'Milli Rehnison': '米利·雷尼森',
    'Ted Rehnison': '泰德·雷尼森',
    'Mine cart driver': '矿车司机',
    'Morgan': '摩根',
    'Morris': '莫里斯',
    'Mosol Rei': '莫索尔·雷',
    'Mountain Dwarf': '山地矮人',
    'Mubariz': '穆巴里兹',
    'Nature Spirit': '自然之灵',
    'Nazastarool': '纳扎斯塔罗尔',
    'Nezikchened': '内齐克切内德',
    'Nilhoof': '尼尔胡夫',
    'Noterazzo': '诺特拉佐',
    'Nulodion': '努洛迪恩',
    'Obli': '奥布利',
    'Observatory assistant': '天文台助手',
    'Observatory professor': '天文台教授',
    'Og': '奥格',
    'Omart': '奥马特',
    'Othainian': '奥萨尼安',
    'Otherworldly being': '异世界生物',
    'Panning guide': '淘金向导',
    'Philipe Carnillean': '菲利普·卡尼利安',
    'Philop': '菲洛普',
    'Pierre': '皮埃尔',
    'Radimus Erkle': '拉迪穆斯·厄克尔',
    'Ranalph Devere': '拉纳尔夫·德维尔',
    'Ranging Guild Doorman': '远程公会门卫',
    'Rantz': '兰茨',
    'Rashiliyia': '拉希利亚',
    'Redbeard Frank': '红胡子弗兰克',
    'Remsai': '雷姆赛',
    'Renegade Knight': '叛逆骑士',
    'Roachey': '罗奇',
    'Roavar': '罗瓦尔',
    'Rometti': '罗梅蒂',
    'Rufus': '鲁弗斯',
    'RPDT employee': 'RPDT 员工',
    'Sabeil': '萨贝尔',
    'Sabreen': '萨布琳',
    'Salarin the twisted': '扭曲者萨拉林',
    'San Tojalon': '圣托哈隆',
    'Sbott': '斯博特',
    'Seaman Lorris': '水手洛里斯',
    'Seaman Thresnor': '水手瑟雷斯诺',
    'Seravel': '瑟拉维尔',
    'Seth': '塞斯',
    'Shamus': '沙默斯',
    'Shantay': '尚泰',
    'Shantay Guard': '尚泰守卫',
    'Shilop': '希洛普',
    'Shipyard worker': '造船厂工人',
    'Siegfried Erkle': '西格弗里德·厄克尔',
    'Sigbert the Adventurer': '冒险家西格伯特',
    'Speedy Keith': '快手基思',
    'Spirit of Scorpius': '天蝎之灵',
    'Stanford': '斯坦福德',
    'Stankers': '斯坦克斯',
    'Tafani': '塔法尼',
    'Temple guardian': '神殿守卫',
    'The Fisher King': '渔夫王',
    'The Lady of the Lake': '湖中仙女',
    'Thrantax The Mighty': '强大的斯兰塔克斯',
    'Toban': '托班',
    'Tribesman': '部落战士',
    'Trobert': '特罗伯特',
    'Trufitus': '特鲁菲图斯',
    'Twig': '特维格',
    'Ulizius': '乌利齐乌斯',
    'Ungadulu': '乌恩加都鲁',
    'Velrak the explorer': '探险家维尔拉克',
    'Vigroy': '维格罗伊',
    'Viyeldi': '维耶尔迪',
    'Watchtower wizard': '瞭望塔巫师',
    'Wayne': '韦恩',
    'Weakened Delrith': '虚弱的德尔里斯',
    'Willow the wisp': '鬼火柳',
    'Wilough': '维洛',
    'Winelda': '温尔达',
    'Witch': '女巫',
    'Witches experiment': '女巫的实验体',
    'Witches experiment second form': '女巫的实验体（第二形态）',
    'Witches experiment third form': '女巫的实验体（第三形态）',
    'Witches experiment fourth form': '女巫的实验体（第四形态）',
    'Wizard Cromperty': '克隆佩蒂巫师',
    'Wizard Distentor': '迪斯滕托巫师',
    'Wizard Frumscone': '弗鲁姆斯科恩巫师',
    'Wizard Grayzag': '格雷扎格巫师',
    'Wizard Mizgog': '米兹戈格巫师',
    'Wyson the gardener': '园丁韦森',
    'Yanni Salika': '亚尼·萨利卡',
    'Yohnus': '约努斯',
    "Zadimus' spirit.": '扎迪穆斯之灵',
    'Zahwa': '扎赫瓦',
    'Zambo': '赞博',
    'Zamorak Wizard': '扎莫拉克巫师',
    'Zenesha': '泽内莎',
    'chadwell': '查德韦尔',
};

// ========== Pattern-based name translation ==========
// Handles systematic names like "Adamant full helm", "Attack potion(3)", "Raw lobster"
// by composing translations from component parts.

const METAL_PREFIX: Record<string, string> = {
    'bronze': '青铜', 'iron': '铁', 'steel': '钢', 'mithril': '秘银',
    'adamant': '精金', 'adamantite': '精金', 'adamnt': '精金',
    'rune': '符文', 'runite': '符文',
    'black': '黑铁', 'white': '白铁', 'dragon': '龙',
    'blurite': '蓝铁',
};

const EQUIP_SUFFIX: Record<string, string> = {
    'sword': '剑', 'dagger': '匕首', 'axe': '斧', 'scimitar': '弯刀',
    'longsword': '长剑', '2h sword': '双手剑', 'battleaxe': '战斧',
    'warhammer': '战锤', 'mace': '锤', 'spear': '矛', 'halberd': '戟',
    'full helm': '全盔', 'med helm': '中盔',
    'chainbody': '链甲', 'platebody': '板甲',
    'platelegs': '板腿', 'plateskirt': '板裙',
    'sq shield': '方盾', 'kiteshield': '鸢盾',
    'arrow': '箭', 'arrows': '箭', 'arrowtips': '箭头',
    'dart': '飞镖', 'dart tip': '飞镖头',
    'knife': '小刀', 'javelin': '标枪', 'thrownaxe': '投斧',
    'fire arrows': '火箭',
    'pickaxe': '镐',
};

const EQUIP_DECORATION: Record<string, string> = {
    '(p)': '(淬毒)', '(g)': '(镶金)', '(t)': '(镶边)',
    '(1)': '(1)', '(2)': '(2)', '(3)': '(3)', '(4)': '(4)',
};

const FOOD_PREFIX: Record<string, string> = {
    'raw': '生', 'burnt': '烧焦的', 'cooked': '熟',
};

const POTION_NAMES: Record<string, string> = {
    'attack': '攻击', 'strength': '力量', 'defence': '防御',
    'prayer': '祈祷', 'restore': '恢复', 'fishing': '钓鱼',
    'ranging': '远程', 'antifire': '抗火', 'antipoison': '解毒',
    'superantipoison': '超级解毒', 'zamorak': '扎莫拉克',
    'super attack': '超级攻击', 'super strength': '超级力量',
    'super defence': '超级防御',
};

const STAFF_ELEMENT: Record<string, string> = {
    'air': '风', 'water': '水', 'earth': '土', 'fire': '火',
};

const COMMON_ITEMS: Record<string, string> = {
    // Jewelry
    'amulet': '护符', 'necklace': '项链', 'ring': '戒指',
    'gold amulet': '金护符', 'gold necklace': '金项链', 'gold ring': '金戒指',
    'sapphire amulet': '蓝宝石护符', 'sapphire necklace': '蓝宝石项链', 'sapphire ring': '蓝宝石戒指',
    'emerald amulet': '祖母绿护符', 'emerald necklace': '祖母绿项链', 'emerald ring': '祖母绿戒指',
    'ruby amulet': '红宝石护符', 'ruby necklace': '红宝石项链', 'ruby ring': '红宝石戒指',
    'diamond amulet': '钻石护符', 'diamond necklace': '钻石项链', 'diamond ring': '钻石戒指',
    'dragon necklace': '龙项链', 'dragonstone ring': '龙石戒指',
    'brass necklace': '黄铜项链', 'silver necklace': '银项链',
    // Staves
    'staff': '法杖', 'battlestaff': '战斗法杖',
    'staff of air': '风法杖', 'staff of water': '水法杖',
    'staff of earth': '土法杖', 'staff of fire': '火法杖',
    'air battlestaff': '风战斗法杖', 'water battlestaff': '水战斗法杖',
    'earth battlestaff': '土战斗法杖', 'fire battlestaff': '火战斗法杖',
    'mystic air staff': '神秘风法杖', 'mystic water staff': '水神秘法杖',
    'mystic earth staff': '神秘土法杖', 'mystic fire staff': '神秘火法杖',
    'magic staff': '魔法法杖',
    // Bows
    'shortbow': '短弓', 'longbow': '长弓',
    'magic shortbow': '魔法短弓', 'magic longbow': '魔法长弓',
    'maple shortbow': '枫木短弓', 'maple longbow': '枫木长弓',
    'yew shortbow': '紫杉短弓', 'yew longbow': '紫杉长弓',
    'crossbow': '弩', 'bolt': '弩矢',
    // Leather & Ranged armor
    'leather body': '皮甲', 'leather boots': '皮靴',
    'leather chaps': '皮裤', 'leather cowl': '皮兜帽',
    'leather gloves': '皮手套', 'leather vambraces': '皮护腕',
    'hardleather body': '硬皮甲',
    'studded body': '铆钉甲', 'studded chaps': '铆钉裤',
    'dragon leather': '龙皮', 'dragonhide': '龙皮',
    'dragonhide body': '龙皮甲', 'dragonhide chaps': '龙皮裤',
    'dragon vambraces': '龙护腕',
    'coif': '锁甲头巾',
    // Robes
    'robe top': '法袍上衣', 'robe bottoms': '法袍下装',
    'black robe': '黑法袍', 'black skirt': '黑裙',
    'blue skirt': '蓝裙', 'pink skirt': '粉裙',
    "monk's robe": '僧侣长袍', "druid's robe": '德鲁伊长袍',
    "wizard's boots": '巫师靴', 'wizards hat': '巫师帽', 'wizards robe': '巫师长袍',
    // Hats & Capes
    'cape': '斗篷', 'hat': '帽子', 'gloves': '手套',
    'white apron': '白围裙', 'brown apron': '棕围裙',
    "chef's hat": '厨师帽', 'headband': '头带',
    // Tools & resources
    'flax': '亚麻', 'bow string': '弓弦',
    'clay': '黏土', 'soft clay': '软黏土',
    'molten glass': '熔融玻璃', 'soda ash': '苏打灰',
    'bucket of sand': '一桶沙子', 'bucket of milk': '一桶牛奶',
    'bucket of wax': '一桶蜡', 'seaweed': '海藻',
    'plank': '木板',
    'vial': '药瓶', 'vial of water': '一瓶水',
    'pestle and mortar': '研钵和杵',
    'glassblowing pipe': '吹玻璃管',
    'cooking pot': '烹饪锅',
    // Foods
    'banana': '香蕉', 'apple pie': '苹果派',
    'meat pie': '肉派', 'redberry pie': '红莓派',
    'stew': '炖菜', 'curry': '咖喱',
    'pizza base': '披萨底', 'plain pizza': '原味披萨',
    'meat pizza': '肉披萨', 'anchovy pizza': '凤尾鱼披萨',
    'pineapple pizza': '菠萝披萨',
    'bread dough': '面团', 'pastry dough': '酥皮面团',
    'pie dish': '派盘', 'pie shell': '派壳', 'cake tin': '蛋糕模',
    'chocolate bar': '巧克力', 'chocolate dust': '巧克力粉',
    'chocolate cake': '巧克力蛋糕', 'chocolate slice': '巧克力片',
    'cup of tea': '一杯茶', 'beer': '啤酒', 'wine of zamorak': '扎莫拉克之酒',
    'jug of wine': '一壶葡萄酒', 'grapes': '葡萄',
    'lemon': '柠檬', 'orange': '橙子', 'lime': '酸橙',
    'pineapple': '菠萝', 'cooking apple': '烹饪苹果',
    'raw bass': '生鲈鱼', 'bass': '鲈鱼',
    'raw pike': '生梭鱼', 'pike': '梭鱼',
    'raw mackerel': '生鲭鱼', 'mackerel': '鲭鱼',
    'raw cod': '生鳕鱼', 'cod': '鳕鱼',
    'raw shark': '生鲨鱼', 'raw manta ray': '生魔鬼鱼',
    'raw sea turtle': '生海龟', 'sea turtle': '海龟', 'manta ray': '魔鬼鱼',
    'raw lava eel': '生熔岩鳗', 'lava eel': '熔岩鳗',
    'kebab': '烤肉串', 'redberries': '红莓',
    // Herbs
    'guam leaf': '瓜姆叶', 'marrentill': '马伦提尔',
    'tarromin': '塔罗敏', 'harralander': '哈拉兰德',
    'ranarr weed': '拉纳尔草', 'irit leaf': '伊利特叶',
    'avantoe': '阿凡托', 'kwuarm': '夸姆',
    'cadantine': '卡丹汀', 'lantadyme': '兰塔迪姆',
    'dwarf weed': '矮人草', 'torstol': '托斯托',
    'herb': '草药', 'unidentified herb': '未鉴定草药',
    'eye of newt': '蝾螈之眼', 'limpwurt root': '林普根',
    'snape grass': '斯纳佩草', 'unicorn horn': '独角兽角',
    'unicorn horn dust': '独角兽角粉',
    'red spiders\' eggs': '红蜘蛛卵', 'white berries': '白莓',
    'jangerberries': '詹格莓', 'dwellberries': '居住莓',
    'wine of zamorak': '扎莫拉克之酒',
    // Runes & Talismans
    'blood rune': '血符文', 'soul rune': '灵魂符文',
    'air talisman': '风护符', 'water talisman': '水护符',
    'earth talisman': '土护符', 'fire talisman': '火护符',
    'mind talisman': '心灵护符', 'body talisman': '身体护符',
    'chaos talisman': '混沌护符', 'nature talisman': '自然护符',
    'cosmic talisman': '宇宙护符', 'law talisman': '法律护符',
    'death talisman': '死亡护符', 'blood talisman': '血护符',
    'soul talisman': '灵魂护符',
    'rune essence': '符文精华',
    // Common items
    'ashes': '灰烬', 'bones': '骨头',
    'babydragon bones': '幼龙骨头', 'dragon bones': '龙骨',
    'bat bones': '蝙蝠骨', 'wolf bones': '狼骨', 'big bones': '大骨头',
    'cow hide': '牛皮',
    'gold': '金币', 'silk': '丝绸',
    'spice': '香料', 'garlic': '大蒜',
    'ball': '球', 'candle': '蜡烛', 'torch': '火把',
    'lockpick': '开锁器', 'machete': '砍刀',
    // Misc
    'holy symbol': '圣符', 'unholy symbol': '邪符',
    'amulet of power': '力量护符', 'amulet of strength': '力量护符',
    'amulet of magic': '魔法护符', 'amulet of defence': '防御护符',
    'amulet of accuracy': '精准护符',
    'amulet of glory': '荣耀护符',
    'ring of life': '生命戒指', 'ring of recoil': '反弹戒指',
    'ring of wealth': '财富戒指', 'ring of forging': '锻造戒指',
    'uncut dragonstone': '未切割龙石', 'uncut red topaz': '未切割红黄晶',
    'red topaz': '红黄晶',
    'dragonstone': '龙石',
    'crystal key': '水晶钥匙', 'brass key': '黄铜钥匙', 'dusty key': '尘封钥匙',
    'excalibur': '王者之剑', 'silverlight': '银光',
    'dramen staff': '德拉门法杖', 'dramen branch': '德拉门树枝',
    'bronze wire': '青铜线', 'bronze key': '青铜钥匙',
    'iron key': '铁钥匙', 'steel studs': '钢铆钉',
    'nails': '钉子', 'arrow shaft': '箭杆', 'headless arrow': '无头箭',
    'ogre arrow': '食人魔箭', 'ice arrows': '冰箭',
    'poison': '毒药', 'weapon poison': '武器毒药',
    'santa hat': '圣诞帽', 'scythe': '镰刀',
    'bunny ears': '兔耳朵', 'pumpkin': '南瓜', 'easter egg': '复活节彩蛋',
    'christmas cracker': '圣诞拉炮',
    'red partyhat': '红派对帽', 'blue partyhat': '蓝派对帽',
    'green partyhat': '绿派对帽', 'yellow partyhat': '黄派对帽',
    'purple partyhat': '紫派对帽', 'white partyhat': '白派对帽',
    'red dye': '红色染料', 'blue dye': '蓝色染料',
    'yellow dye': '黄色染料', 'orange dye': '橙色染料',
    'green dye': '绿色染料', 'purple dye': '紫色染料',
    'goblin mail': '哥布林铠甲',
    'red bead': '红珠', 'blue bead': '蓝珠',
    'yellow bead': '黄珠', 'white bead': '白珠', 'black bead': '黑珠',
    'map part': '地图碎片', 'casket': '箱子', 'clue scroll': '线索卷轴',
    'scroll': '卷轴', 'key': '钥匙', 'lamp': '神灯',
    // Items from "You've found..." and common loot
    'broken staff': '断裂的法杖', 'broken arrow': '断裂的箭',
    'broken glass': '碎玻璃', 'broken armour': '损坏的盔甲',
    'broken axe': '断裂的斧头', 'broken pickaxe': '断裂的镐',
    'broken shield': '损坏的盾牌',
    'damaged armour': '损坏的盔甲', 'damaged dagger': '损坏的匕首',
    'rusty sword': '生锈的剑', 'old boot': '旧靴子',
    'buttons': '纽扣', 'pot': '罐子', 'coins': '金币',
    'rock sample': '岩石样本', 'specimen jar': '标本瓶',
    'nuggets': '金块', 'herb': '草药',
    'wool': '羊毛', 'fur': '毛皮',
    'rotten food': '腐烂的食物', 'rotten tomato': '腐烂的番茄',
    'stew': '炖菜', 'empty cup': '空杯子',
    // Unfinished items
    'unfinished cocktail': '未完成的鸡尾酒', 'unfinished potion': '未完成的药水',
    'unfinished batta': '未完成的巴塔', 'unfinished bowl': '未完成的碗',
    'unfinished crunchy': '未完成的脆饼',
    // Leaves & herbs
    'doogle leaves': '杜格尔叶', 'equa leaves': '艾克瓦叶',
    'toad legs': '蟾蜍腿', 'cheese+tom batta': '奶酪番茄巴塔',
    'worm batta': '蠕虫巴塔', 'toad batta': '蟾蜍巴塔',
    'fruit batta': '水果巴塔', 'veg batta': '蔬菜巴塔',
    'worm crunchies': '蠕虫脆饼', 'choc chip crunchies': '巧克力脆饼',
    'spicy crunchies': '辛辣脆饼', 'toad crunchies': '蟾蜍脆饼',
    // Clothing & equipment
    'boots': '靴子', 'gloves': '手套', 'cloak': '斗篷',
    'apron': '围裙', 'shirt': '衬衫', 'trousers': '裤子',
    'skirt': '裙子', 'robe': '长袍', 'gown': '礼服',
    'tiara': '头冠',
    // Pet
    'pet cat': '宠物猫', 'pet kitten': '宠物小猫',
    'overgrown cat': '成年猫', 'lazy cat': '懒猫',
    // Quest items
    'crystal': '水晶', 'orb': '宝珠', 'talisman': '护符',
    'amulet': '护符', 'pendant': '吊坠',
    'diary': '日记', 'book': '书', 'map': '地图',
    'letter': '信件', 'note': '便条', 'message': '消息',
    'certificate': '证书', 'ticket': '票',
    'staff': '法杖', 'shield': '盾牌', 'sword': '剑',
    'helmet': '头盔', 'armour': '盔甲',
    // Containers
    'empty vial': '空药瓶', 'empty pot': '空罐子',
    'empty jug': '空壶', 'empty bucket': '空桶',
    'empty cup': '空杯子',
    // Materials
    'limestone': '石灰石', 'limestone brick': '石灰石砖',
    'swamp tar': '沼泽焦油', 'swamp paste': '沼泽糊',
    'ashes': '灰烬', 'charcoal': '木炭',
    'sulphur': '硫磺', 'saltpetre': '硝石',
    'papyrus': '纸莎草', 'sextant': '六分仪',
    'watch': '怀表', 'chart': '海图',
    // Food extras
    'peach': '桃子', 'watermelon': '西瓜',
    'sweetcorn': '甜玉米', 'strawberry': '草莓',
    'mushroom': '蘑菇', 'seaweed': '海藻',
    'raw chicken': '生鸡肉', 'raw beef': '生牛肉',
    'raw bear meat': '生熊肉', 'raw rat meat': '生鼠肉',
    'cooked chicken': '熟鸡肉', 'cooked meat': '熟肉',
    // Misc common
    'cadava berries': '卡达瓦浆果', 'dwellberries': '居住莓',
    'jangerberries': '詹格莓', 'whiteberries': '白莓',
    'poison ivy berries': '毒藤浆果',
    'bird snare': '鸟陷阱', 'box trap': '箱子陷阱',
    'bronze wire': '青铜线', 'iron spit': '铁烤叉',
    'fishing bait': '鱼饵', 'feather': '羽毛',
    'tatty note': '破旧的便条',
};

const COMMON_LOCS: Record<string, string> = {
    'stairs': '楼梯', 'staircase': '楼梯', 'ladder': '梯子',
    'door': '门', 'gate': '大门', 'fence': '围栏',
    'wall': '墙', 'window': '窗户', 'curtain': '窗帘',
    'tree': '树', 'bush': '灌木', 'hedge': '树篱',
    'rock': '岩石', 'rocks': '岩石', 'rocks.': '岩石',
    'boulder': '巨石', 'stone': '石头', 'stones': '石头',
    'altar': '祭坛', 'anvil': '铁砧', 'furnace': '熔炉',
    'range': '灶台', 'fire': '火堆', 'well': '水井',
    'chest': '箱子', 'crate': '板条箱', 'barrel': '木桶',
    'table': '桌子', 'chair': '椅子', 'bench': '长椅',
    'bed': '床', 'bookcase': '书架',
    'bank booth': '银行柜台', 'bank table': '银行桌',
    'sign': '标牌', 'signpost': '路标',
    'fountain': '喷泉', 'statue': '雕像', 'pillar': '柱子',
    'sack': '麻袋', 'sacks': '麻袋', 'old sacks': '旧麻袋',
    'shelf': '架子', 'shelves': '架子',
    'cupboard': '柜子', 'wardrobe': '衣柜', 'drawers': '抽屉',
    'desk': '书桌', 'dresser': '梳妆台',
    'lever': '拉杆', 'trapdoor': '活板门', 'trap door': '活板门',
    'cave': '洞穴', 'cave entrance': '洞穴入口', 'cave exit': '洞穴出口',
    'tunnel': '隧道', 'bridge': '桥', 'plank': '木板',
    'rope': '绳子', 'vine': '藤蔓', 'web': '蛛网',
    'mushroom': '蘑菇', 'mushrooms': '蘑菇', 'flowers': '花',
    'flower': '花', 'plant': '植物', 'fern': '蕨类',
    'stool': '凳子', 'rug': '地毯',
    'painting': '画', 'portrait': '肖像画',
    'sink': '水槽', 'drain': '排水沟',
    'fireplace': '壁炉', 'oven': '烤箱',
    'stile': '阶梯', 'stepping stone': '踏脚石',
    'stepping stones': '踏脚石', 'log balance': '平衡木',
    'obstacle net': '障碍网', 'obstacle pipe': '障碍管道',
    'climbing rocks': '攀岩点', 'climbing rope': '攀爬绳',
    'ropeswing': '绳索秋千', 'rope swing': '绳索秋千',
    'balancing rope': '平衡绳', 'balancing ledge': '平衡窄架',
    'monkey bars': '猴杆', 'monkeybars': '猴杆',
    'hand holds': '攀爬点', 'ledge': '窄架',
    'gangplank': '跳板', 'sail': '帆', 'mast': '桅杆',
    'anchor': '锚', 'hull': '船体',
    'cart': '推车', 'wagon': '马车',
    'hay bail': '干草堆', 'hay bails': '干草堆', 'haystack': '干草垛',
    'scarecrow': '稻草人', 'wheat': '小麦', 'thistle': '蓟草',
    'cage': '笼子', 'coffin': '棺材', 'tomb': '墓穴',
    'grave': '坟墓', 'gravestone': '墓碑', 'tombstone': '墓碑',
    'cross': '十字架', 'monument': '纪念碑',
    'flag': '旗帜', 'flagpole': '旗杆', 'banner': '旗帜',
    'rack': '架子', 'hook': '钩子',
    'mine cart': '矿车', 'mine cave': '矿洞',
    'swamp': '沼泽', 'sand': '沙地', 'mud': '泥地',
    'waterfall rocks': '瀑布岩石', 'whirlpool': '漩涡',
    'noticeboard': '告示板', 'notice board': '告示板',
    'bank notice board': '银行告示板',
    'spirit tree': '灵魂之树', 'hollow tree': '空心树',
    'bell': '钟', 'clock': '时钟', 'grandfather clock': '落地钟',
    'cauldron': '大锅', 'vat': '大桶',
    'counter': '柜台', 'workbench': '工作台',
    'dummy': '训练假人', 'target': '靶子',
    'obelisk': '方尖碑',
    'obelisk of air': '风之方尖碑', 'obelisk of water': '水之方尖碑',
    'obelisk of earth': '土之方尖碑', 'obelisk of fire': '火之方尖碑',
    'portal': '传送门', 'magic portal': '魔法传送门',
    'mysterious ruins': '神秘遗迹',
    'spinning wheel': '纺车', 'loom': '织布机',
    'cooking range': '烹饪灶台',
    'flour bin': '面粉箱', 'hopper': '料斗',
    'banana tree': '香蕉树', 'palm tree': '棕榈树',
    'bamboo tree': '竹子', 'jungle tree': '丛林树', 'dead tree': '枯树',
    'evergreen': '常青树', 'tree stump': '树桩',
    'jungle plant': '丛林植物', 'pineapple plant': '菠萝植物',
    'cactus': '仙人掌', 'vine': '藤蔓',
    // Doors & gates (variants)
    'large door': '大门', 'metal door': '金属门',
    'ancient gate': '古老大门', 'city gate': '城门',
    'iron gate': '铁门', 'wooden gate': '木门',
    'temple door': '神殿门', 'magic door': '魔法门',
    'sturdy door': '坚固的门', 'stone door': '石门',
    // Containers
    'closed chest': '关着的箱子', 'open chest': '打开的箱子',
    'wooden chest': '木箱', 'treasure chest': '宝箱',
    // Obstacles
    'rockslide': '滑坡', 'roots': '树根',
    'odd looking wall': '奇怪的墙', 'crumbling wall': '破碎的墙',
    'spear wall': '长矛墙', 'wall of flames': '火墙',
    'wall of water': '水墙',
    'loose railing': '松动的栏杆', 'broken railing': '损坏的栏杆',
    'underwall tunnel': '墙下隧道',
    // Puzzles
    'sliding piece': '滑块',
    // Misc locations
    'stone tablet': '石碑', 'tombstone': '墓碑',
    'scorpion cage': '蝎子笼', 'bird cage': '鸟笼',
    'standard': '旗帜',
    'candles': '蜡烛', 'torch': '火把', 'lit torch': '点燃的火把',
    'cooking pot': '烹饪锅', 'cauldron': '大锅',
    'log bridge': '圆木桥', 'stone bridge': '石桥',
    'pipe': '管道', 'handholds': '攀爬点',
    'dark hole': '黑洞', 'hole': '洞', 'crevice': '裂缝',
    'mine cart': '矿车', 'tracks': '轨道',
    'trough': '水槽', 'grain hopper': '谷物料斗',
    'watchtower': '瞭望塔', 'lookout': '了望台',
    'compost heap': '堆肥', 'hay bale': '干草捆',
    'fishing rod holder': '鱼竿架', 'fishing spot': '钓鱼点',
    // Stalls
    "baker's stall": '面包摊', 'bakery stall': '面包摊',
    'fur stall': '皮毛摊', 'gem stall': '宝石摊',
    'silk stall': '丝绸摊', 'silver stall': '银器摊',
    'spice stall': '香料摊', 'tea stall': '茶叶摊',
    'market stall': '市场摊位',
    'fairy market stall': '仙女市场摊位',
};

// Pattern-based name translation fallback
function patternTranslateName(name: string): string | undefined {
    const lower = name.toLowerCase();

    // Check common items/locs maps
    const common = COMMON_ITEMS[lower] ?? COMMON_LOCS[lower];
    if (common !== undefined) return common;

    // Pattern: "Metal WeaponType" or "Metal WeaponType(p)" etc.
    for (const [metal, metalZh] of Object.entries(METAL_PREFIX)) {
        if (!lower.startsWith(metal + ' ')) continue;
        let rest = lower.slice(metal.length + 1);
        let suffix = '';
        // Check for decoration suffix like (p), (g), (t)
        const decoMatch = rest.match(/^(.+?)(\([a-z0-9]+\))$/);
        if (decoMatch) {
            rest = decoMatch[1].trimEnd();
            suffix = EQUIP_DECORATION[decoMatch[2]] ?? decoMatch[2];
        }
        const equipZh = EQUIP_SUFFIX[rest];
        if (equipZh !== undefined) return metalZh + equipZh + suffix;
    }

    // Pattern: "Potion(N)" - e.g. "Attack potion(3)", "Super strength(2)"
    const potionMatch = lower.match(/^(.+?)(?:\s+)?(?:potion)?\((\d)\)$/);
    if (potionMatch) {
        const potionName = potionMatch[1].trim();
        const dose = potionMatch[2];
        const nameZh = POTION_NAMES[potionName];
        if (nameZh !== undefined) return nameZh + '药水(' + dose + ')';
    }

    // Pattern: "Raw/Burnt/Cooked FoodName"
    for (const [prefix, prefixZh] of Object.entries(FOOD_PREFIX)) {
        if (!lower.startsWith(prefix + ' ')) continue;
        const foodName = name.slice(prefix.length + 1);
        const foodZh = ZH_NAMES_LOWER.get(foodName.toLowerCase())
            ?? COMMON_ITEMS[foodName.toLowerCase()];
        if (foodZh !== undefined) return prefixZh + foodZh;
    }

    // Pattern: "Amulet of glory(N)" etc.
    const chargedMatch = lower.match(/^(.+?)\((\d)\)$/);
    if (chargedMatch) {
        const base = chargedMatch[1].trim();
        const charges = chargedMatch[2];
        const baseZh = COMMON_ITEMS[base] ?? ZH_NAMES_LOWER.get(base);
        if (baseZh !== undefined) return baseZh + '(' + charges + ')';
    }

    // Pattern: "Ring of dueling(N)"
    const ringMatch = lower.match(/^ring of dueling\((\d)\)$/);
    if (ringMatch) return '决斗戒指(' + ringMatch[1] + ')';

    // Pattern: trimmed/gold equipment: "Rune full helm (g)"
    const decoEquipMatch = lower.match(/^(.+?)\s+\(([gtp])\)$/);
    if (decoEquipMatch) {
        const baseName = decoEquipMatch[1];
        const decoType = '(' + decoEquipMatch[2] + ')';
        const decoZh = EQUIP_DECORATION[decoType] ?? decoType;
        // Try to translate the base part
        const baseZh = ZH_NAMES_LOWER.get(baseName)
            ?? patternTranslateName(baseName);
        if (baseZh !== undefined) return baseZh + decoZh;
    }

    return undefined;
}

// Level-up skill name mapping (lowercase as used in level-up messages)
const LEVELUP_SKILL_ZH: Record<string, string> = {
    'attack': '攻击',
    'strength': '力量',
    'ranged': '远程',
    'ranging': '远程',
    'magic': '魔法',
    'defence': '防御',
    'hitpoints': '生命值',
    'prayer': '祈祷',
    'agility': '敏捷',
    'herblore': '草药学',
    'thieving': '盗窃',
    'crafting': '制作',
    'runecraft': '符文制作',
    'mining': '采矿',
    'smithing': '锻造',
    'fishing': '钓鱼',
    'cooking': '烹饪',
    'fire making': '生火',
    'woodcutting': '伐木',
    'fletching': '制箭',
};

// ========== Case-insensitive + plural/singular lookup indexes ==========
// Built once at module load for O(1) lookups

function buildLowerMap(dict: Record<string, string>): Map<string, string> {
    const map = new Map<string, string>();
    for (const [key, value] of Object.entries(dict)) {
        map.set(key.toLowerCase(), value);
    }
    return map;
}

const ZH_DICT_LOWER = buildLowerMap(ZH_DICT);
const ZH_NAMES_LOWER = buildLowerMap(ZH_NAMES);

// Flexible dict lookup: exact → case-insensitive
function lookupDict(text: string): string | undefined {
    return ZH_DICT[text] ?? ZH_DICT_LOWER.get(text.toLowerCase());
}

// Flexible name lookup: exact → case-insensitive → plural → singular → pattern
function lookupName(name: string): string {
    // Exact
    const exact = ZH_NAMES[name];
    if (exact !== undefined) return exact;
    // Case-insensitive
    const lower = name.toLowerCase();
    const ci = ZH_NAMES_LOWER.get(lower);
    if (ci !== undefined) return ci;
    // Plural (add 's')
    const plural = ZH_NAMES_LOWER.get(lower + 's');
    if (plural !== undefined) return plural;
    // Singular (remove trailing 's')
    if (lower.endsWith('s')) {
        const singular = ZH_NAMES_LOWER.get(lower.slice(0, -1));
        if (singular !== undefined) return singular;
    }
    // Pattern-based fallback (metal+equip, potions, raw/cooked, etc.)
    const pattern = patternTranslateName(name);
    if (pattern !== undefined) return pattern;
    return name;
}

// ========== Public translation functions ==========

// Translate a UI string if language is set to Chinese
export function t(text: string, langSetting: number): string {
    if (langSetting !== 1) {
        return text;
    }
    // Dict lookup (exact + case-insensitive)
    const dictMatch = lookupDict(text);
    if (dictMatch !== undefined) {
        return dictMatch;
    }
    // Pattern: "@dbl@Congratulations, you just advanced a/an SKILL level."
    const congratsMatch = text.match(/^(@dbl@)?Congratulations, you just advanced (?:a|an) (.+?) level\.$/);
    if (congratsMatch) {
        const prefix = congratsMatch[1] || '';
        const skill = congratsMatch[2];
        const skillZh = LEVELUP_SKILL_ZH[skill] ?? skill;
        return prefix + '恭喜你，你的' + skillZh + '等级提升了！';
    }
    // Pattern: "Your SKILL level is now NUMBER." or "Your hitpoints are now NUMBER."
    const levelNowMatch = text.match(/^Your (.+?) (?:level is|are) now (\d+)\.$/);
    if (levelNowMatch) {
        const skill = levelNowMatch[1];
        const level = levelNowMatch[2];
        const skillZh = LEVELUP_SKILL_ZH[skill] ?? skill;
        return '你的' + skillZh + '等级现在是 ' + level + '。';
    }
    // Pattern: "Level X" → "等级 X"
    const levelMatch = text.match(/^Level (\d+)$/);
    if (levelMatch) {
        return '等级 ' + levelMatch[1];
    }
    // Pattern: "Level X\nName" → "等级 X\n翻译名" (prayer/spell tooltips)
    const levelNameMatch = text.match(/^Level (\d+)\\n(.+)$/);
    if (levelNameMatch) {
        const name = lookupDict(levelNameMatch[2]) ?? levelNameMatch[2];
        return '等级 ' + levelNameMatch[1] + '\\n' + name;
    }
    // Pattern: "Level X : Spell Name" or "Level X: Spell Name" → "等级 X : 翻译名"
    const levelSpellMatch = text.match(/^Level (\d+)\s*:\s*(.+)$/);
    if (levelSpellMatch) {
        const spellName = lookupDict(levelSpellMatch[2]) ?? levelSpellMatch[2];
        return '等级 ' + levelSpellMatch[1] + ' : ' + spellName;
    }
    // Pattern: "Name: +/-number" → equipment bonus text
    const bonusMatch = text.match(/^(\w+):\s*([+-]?\d+)$/);
    if (bonusMatch) {
        const name = lookupDict(bonusMatch[1]) ?? bonusMatch[1];
        return name + ': ' + bonusMatch[2];
    }
    // Pattern: "You need a SKILL level of X to ..."
    const skillReqMatch = text.match(/^You need (?:a|an) (.+?) level of (\d+) to (.+)$/);
    if (skillReqMatch) {
        const skill = skillReqMatch[1];
        const level = skillReqMatch[2];
        const action = skillReqMatch[3];
        const skillZh = lookupDict(skill) ?? skill;
        return '你需要' + level + '级' + skillZh + '才能' + action;
    }
    // Pattern: "You've found a/an/some ITEM." or "You've found a/an/some ITEM!"
    const foundMatch = text.match(/^You've found (a |an |some |the )?(.+?)[.!]$/);
    if (foundMatch) {
        const article = foundMatch[1]?.trim();
        const item = foundMatch[2];
        const itemZh = lookupName(item);
        const articleZh = article === 'some' ? '一些' : '';
        if (itemZh !== item) {
            return '你找到了' + articleZh + itemZh + '。';
        }
    }
    // Pattern: "You find a/an/some ITEM." or "You find a/an/some ITEM!"
    const findMatch = text.match(/^You find (a |an |some |the |half a )?(.+?)[.!]$/);
    if (findMatch) {
        const article = findMatch[1]?.trim();
        const item = findMatch[2];
        const itemZh = lookupName(item);
        const articleZh = article === 'some' ? '一些' : article === 'half a' ? '半个' : '';
        if (itemZh !== item) {
            return '你找到了' + articleZh + itemZh + '。';
        }
    }
    // Pattern: "You get some ITEM."
    const getMatch = text.match(/^You get some (.+?)\.$/);
    if (getMatch) {
        const itemZh = lookupName(getMatch[1]);
        if (itemZh !== getMatch[1]) {
            return '你获得了一些' + itemZh + '。';
        }
    }
    // Pattern: "You catch a/an ITEM."
    const catchMatch = text.match(/^You catch (a |an )?(.+?)\.$/);
    if (catchMatch) {
        const itemZh = lookupName(catchMatch[2]);
        if (itemZh !== catchMatch[2]) {
            return '你抓到了' + itemZh + '。';
        }
    }
    // Pattern: "You cook the ITEM."
    const cookMatch = text.match(/^You cook the (.+?)\.$/);
    if (cookMatch) {
        const itemZh = lookupName(cookMatch[1]);
        if (itemZh !== cookMatch[1]) {
            return '你烹饪了' + itemZh + '。';
        }
    }
    // Pattern: "You accidentally burn the ITEM."
    const burnMatch = text.match(/^You accidentally burn the (.+?)\.$/);
    if (burnMatch) {
        const itemZh = lookupName(burnMatch[1]);
        if (itemZh !== burnMatch[1]) {
            return '你不小心把' + itemZh + '烧焦了。';
        }
    }
    // Pattern: "You eat the ITEM."
    const eatMatch = text.match(/^You eat the (.+?)\.$/);
    if (eatMatch) {
        const itemZh = lookupName(eatMatch[1]);
        if (itemZh !== eatMatch[1]) {
            return '你吃了' + itemZh + '。';
        }
    }
    // Pattern: "You manage to mine some ITEM."
    const mineMatch = text.match(/^You manage to mine some (.+?)\.$/);
    if (mineMatch) {
        const itemZh = lookupName(mineMatch[1]);
        if (itemZh !== mineMatch[1]) {
            return '你成功开采了一些' + itemZh + '。';
        }
    }
    // Pattern: "It's a X." or "It's an X." (auto-generated examine fallback)
    const itsAMatch = text.match(/^It's an? (.+?)\.$/);
    if (itsAMatch) {
        const nameZh = lookupName(itsAMatch[1]);
        if (nameZh !== itsAMatch[1]) {
            return '这是' + nameZh + '。';
        }
    }
    // Pattern: "You drink some of your POTION." or "You drink the ITEM."
    const drinkMatch = text.match(/^You drink (?:some of your |the )(.+?)\.$/);
    if (drinkMatch) {
        const itemZh = lookupName(drinkMatch[1]);
        if (itemZh !== drinkMatch[1]) {
            return '你喝了' + itemZh + '。';
        }
    }
    // Pattern: "You bury the ITEM."
    const buryMatch = text.match(/^You bury the (.+?)\.$/);
    if (buryMatch) {
        const itemZh = lookupName(buryMatch[1]);
        if (itemZh !== buryMatch[1]) {
            return '你埋葬了' + itemZh + '。';
        }
    }
    // Pattern: "You open the ITEM." / "You close the ITEM."
    const openCloseMatch = text.match(/^You (open|close) the (.+?)\.$/);
    if (openCloseMatch) {
        const action = openCloseMatch[1] === 'open' ? '打开了' : '关上了';
        const itemZh = lookupName(openCloseMatch[2]);
        if (itemZh !== openCloseMatch[2]) {
            return '你' + action + itemZh + '。';
        }
    }
    // Pattern: "Buy X" / "Sell X" (shop options)
    const buyMatch = text.match(/^Buy (\d+)$/);
    if (buyMatch) {
        return '购买 ' + buyMatch[1] + ' 个';
    }
    const sellMatch = text.match(/^Sell (\d+)$/);
    if (sellMatch) {
        return '出售 ' + sellMatch[1] + ' 个';
    }
    // Pattern: "The door won't open - you need at least X Quest Points."
    const questPointsMatch = text.match(/^The door won't open - you need at least (\d+) Quest Points\.$/);
    if (questPointsMatch) {
        return '门打不开——你至少需要 ' + questPointsMatch[1] + ' 个任务点数。';
    }
    // Pattern: "The door won't open." (and variants)
    const doorWontMatch = text.match(/^The door won't open\.(.*)$/);
    if (doorWontMatch) {
        const rest = doorWontMatch[1];
        if (!rest) return '门打不开。';
        return '门打不开。' + rest;
    }
    // Pattern: "You need to have completed X to enter." / "You need at least X to ..."
    const needAtLeastMatch = text.match(/^You need at least (\d+) (.+?) to (.+)$/);
    if (needAtLeastMatch) {
        const num = needAtLeastMatch[1];
        const what = needAtLeastMatch[2];
        const action = needAtLeastMatch[3];
        const whatZh = lookupDict(what) ?? what;
        return '你至少需要 ' + num + ' ' + whatZh + '才能' + action;
    }
    // Pattern: "Word\nWord" → translate each part separated by \n
    if (text.includes('\\n')) {
        const parts = text.split('\\n');
        const translated = parts.map(p => lookupDict(p) ?? p);
        if (translated.some((p, i) => p !== parts[i])) {
            return translated.join('\\n');
        }
    }
    return text;
}

// Translate an entity name (item, NPC, location)
export function tName(name: string, langSetting: number): string {
    if (langSetting !== 1) {
        return name;
    }
    return lookupName(name);
}

// Translate menu option text (handles patterns like "Attack @yel@Goblin")
export function tMenu(text: string, langSetting: number): string {
    if (langSetting !== 1) {
        return text;
    }

    // Handle "Use X with @color@Target" pattern
    const useWithMatch = text.match(/^Use (.+?) with @([a-z0-9]{3})@(.+)$/);
    if (useWithMatch) {
        const item = lookupName(useWithMatch[1]);
        const target = lookupName(useWithMatch[3]);
        return '对 @' + useWithMatch[2] + '@' + target + ' 使用 ' + item;
    }

    // Handle "Action @color@Target" pattern
    const colorMatch = text.match(/^(.+?)\s+@([a-z0-9]{3})@(.+)$/);
    if (colorMatch) {
        const action = colorMatch[1];
        const color = colorMatch[2];
        const target = colorMatch[3];
        // Handle "Buy N" / "Sell N" actions with dynamic numbers
        let translatedAction: string;
        const buyActionMatch = action.match(/^Buy (\d+)$/);
        const sellActionMatch = action.match(/^Sell (\d+)$/);
        if (buyActionMatch) {
            translatedAction = '购买' + buyActionMatch[1] + '个';
        } else if (sellActionMatch) {
            translatedAction = '出售' + sellActionMatch[1] + '个';
        } else {
            translatedAction = lookupDict(action) ?? action;
        }
        const translatedTarget = lookupName(target);
        return translatedAction + ' @' + color + '@' + translatedTarget;
    }

    return lookupDict(text) ?? text;
}

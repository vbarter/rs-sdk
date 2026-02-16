import fs from 'fs';
import path from 'path';

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

// Skill action translations (the "to X" part of "You need a Y level of Z to X")
const SKILL_ACTION_ZH: Record<string, string> = {
    'chop down this tree.': '砍伐这棵树.',
    'chop down these trees.': '砍伐这些树.',
    'chop this tree.': '砍伐这棵树.',
    'burn these logs.': '燃烧这些原木.',
    'burn this log.': '燃烧这根原木.',
    'mine this rock.': '开采这块岩石.',
    'mine your way through this rock.': '凿穿这块岩石.',
    'clear the rockslide.': '清除碎石.',
    'cook this.': '烹饪这个.',
    'use this furnace.': '使用这个熔炉.',
    'use the spit roast.': '使用烤架.',
    'mix this potion.': '混合这瓶药水.',
    'make this potion.': '制作这瓶药水.',
    'make cannonballs.': '制造炮弹.',
    'make wrapped oomlie meat.': '制作包裹的欧姆利肉.',
    'fix this.': '修理这个.',
    'pick this lock.': '撬开这把锁.',
    'enter the Chef\'s Guild.': '进入厨师公会.',
    'complete this task.': '完成这个任务.',
    'use this item.': '使用这个物品.',
    'use this potion.': '使用这瓶药水.',
    'use this spell outside the Mage Arena.': '在法师竞技场外使用这个法术.',
    'mine elemental ore.': '开采元素矿石.',
};

/**
 * Simple translation service for i18n support.
 * Loads translation dictionaries from JSON files.
 * Supports English (default) and Chinese.
 */
export default class TranslationService {
    private static translations: Map<string, string> = new Map();
    private static loaded: boolean = false;
    private static watching: boolean = false;

    /**
     * Load translation dictionary from file.
     * Expected format: { "English text": "翻译文本", ... }
     */
    static load(locale: string = 'zh'): void {
        const filePath = path.resolve(process.cwd(), `translations/${locale}.json`);

        if (!fs.existsSync(filePath)) {
            console.warn(`[i18n] Translation file not found: ${filePath}`);
            TranslationService.loaded = true;
            return;
        }

        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            TranslationService.translations.clear();

            for (const [key, value] of Object.entries(data)) {
                if (typeof value === 'string') {
                    TranslationService.translations.set(key, value);
                }
            }

            console.log(`[i18n] Loaded ${TranslationService.translations.size} translations for locale: ${locale}`);
            TranslationService.loaded = true;

            // Watch for file changes and auto-reload
            if (!TranslationService.watching) {
                TranslationService.watching = true;
                fs.watchFile(filePath, { interval: 2000 }, () => {
                    console.log(`[i18n] Translation file changed, reloading...`);
                    TranslationService.loaded = false;
                    TranslationService.load(locale);
                });
            }
        } catch (e) {
            console.error(`[i18n] Failed to load translations:`, e);
            TranslationService.loaded = true;
        }
    }

    /**
     * Translate a string. Returns the original if no translation found.
     */
    static translate(text: string): string {
        if (!TranslationService.loaded) {
            TranslationService.load();
        }

        // Exact match
        const exact = TranslationService.translations.get(text);
        if (exact) {
            return exact;
        }

        // Try without color tags (e.g. @yel@, @whi@)
        const stripped = text.replace(/@[a-z0-9]{3}@/gi, '');
        const strippedMatch = TranslationService.translations.get(stripped);
        if (strippedMatch) {
            // Preserve original color tags by replacing the text portion
            return text.replace(stripped, strippedMatch);
        }

        // Dynamic pattern: "Congratulations, you just advanced a/an SKILL level."
        const congratsMatch = text.match(/^(@dbl@)?Congratulations, you just advanced (?:a|an) (.+?) level\.$/);
        if (congratsMatch) {
            const prefix = congratsMatch[1] || '';
            const skill = congratsMatch[2];
            const skillZh = LEVELUP_SKILL_ZH[skill] ?? skill;
            return `${prefix}恭喜你, 你的${skillZh}等级提升了!`;
        }

        // Dynamic pattern: "Your SKILL level is now NUMBER." or "Your hitpoints are now NUMBER."
        const levelNowMatch = text.match(/^Your (.+?) (?:level is|are) now (\d+)\.$/);
        if (levelNowMatch) {
            const skill = levelNowMatch[1];
            const level = levelNowMatch[2];
            const skillZh = LEVELUP_SKILL_ZH[skill] ?? skill;
            return `你的${skillZh}等级现在是 ${level}.`;
        }

        // Dynamic pattern: "You need a @dbl@Prayer level of X to use Y."
        const prayerLevelMatch = text.match(/^You need a (@dbl@)?Prayer level of (\d+) to use (.+)\.$/);
        if (prayerLevelMatch) {
            const colorTag = prayerLevelMatch[1] || '';
            const level = prayerLevelMatch[2];
            const prayerName = prayerLevelMatch[3];
            const translatedName = TranslationService.translations.get(prayerName) ?? prayerName;
            return `你需要${colorTag}${level}级祈祷才能使用${translatedName}.`;
        }

        // Dynamic pattern: "You do not have enough X Runes to cast this spell."
        const runeMatch = text.match(/^You do not have enough (.+) Runes to cast this spell\.$/);
        if (runeMatch) {
            const runeName = runeMatch[1];
            return `你没有足够的${runeName}符文来施放此法术.`;
        }

        // Dynamic pattern: "ITEM: currently costs Xgp." (shop buy price)
        const costMatch = text.match(/^(.+?): currently costs (\d+)gp\.$/);
        if (costMatch) {
            const itemName = costMatch[1];
            const price = costMatch[2];
            const itemZh = TranslationService.translations.get(itemName) ?? itemName;
            return `${itemZh}: 当前售价 ${price} 金币.`;
        }

        // Dynamic pattern: "ITEM: shop will buy for Xgp." (shop sell price)
        const shopBuyMatch = text.match(/^(.+?): shop will buy for (\d+)gp\.$/);
        if (shopBuyMatch) {
            const itemName = shopBuyMatch[1];
            const price = shopBuyMatch[2];
            const itemZh = TranslationService.translations.get(itemName) ?? itemName;
            return `${itemZh}: 商店收购价 ${price} 金币.`;
        }

        // Dynamic pattern: "You pay the fare and hand X gold coins to NAME."
        const fareMatch = text.match(/^You pay the fare and hand (\d+) gold coins to (.+)\.$/);
        if (fareMatch) {
            return `你支付了车费, 交给${fareMatch[2]} ${fareMatch[1]}金币.`;
        }

        // Dynamic pattern: "You pay the judge and he gives you X bronze arrows."
        const judgeMatch = text.match(/^You pay the judge and he gives you (\d+) (.+)\.$/);
        if (judgeMatch) {
            const itemZh = TranslationService.translations.get(judgeMatch[2]) ?? judgeMatch[2];
            return `你付了钱, 裁判给了你${judgeMatch[1]}个${itemZh}.`;
        }

        // Dynamic pattern: "You need a SKILL level of X to ..."
        const skillLevelMatch = text.match(/^You need a (.+?) level of (\d+)(?: or above| or over)? to (.+)$/);
        if (skillLevelMatch) {
            const skill = skillLevelMatch[1];
            const level = skillLevelMatch[2];
            const action = skillLevelMatch[3];
            const skillZh = LEVELUP_SKILL_ZH[skill.toLowerCase()] ?? TranslationService.translations.get(skill) ?? skill;
            const actionZh = SKILL_ACTION_ZH[action] ?? TranslationService.translations.get(action) ?? action;
            return `你需要${skillZh}等级达到${level}才能${actionZh}`;
        }

        // Dynamic pattern: "You need a Woodcutting level of X."
        const skillLevelMatch2 = text.match(/^You need a (.+?) level of (\d+)\.$/);
        if (skillLevelMatch2) {
            const skill = skillLevelMatch2[1];
            const level = skillLevelMatch2[2];
            const skillZh = LEVELUP_SKILL_ZH[skill.toLowerCase()] ?? TranslationService.translations.get(skill) ?? skill;
            return `你需要${skillZh}等级达到${level}.`;
        }

        // Dynamic pattern: "A commonly found X." (scenery examine)
        const commonlyFoundMatch = text.match(/^A commonly found (.+?)\.$/);
        if (commonlyFoundMatch) {
            const nameZh = TranslationService.translations.get(commonlyFoundMatch[1]);
            if (nameZh) return `常见的${nameZh}.`;
            return `一种常见的${commonlyFoundMatch[1]}.`;
        }

        // Dynamic pattern: "It's a/an X." (examine)
        const itsAMatch = text.match(/^It's an? (.+?)\.$/);
        if (itsAMatch) {
            const nameZh = TranslationService.translations.get(itsAMatch[1]);
            if (nameZh) return `这是${nameZh}.`;
        }

        // Dynamic pattern: "A/An X." (generic examine)
        const aMatch = text.match(/^An? (.+?)\.$/);
        if (aMatch) {
            const nameZh = TranslationService.translations.get(aMatch[1]);
            if (nameZh) return `${nameZh}.`;
        }

        // Dynamic pattern: "Some X." (examine)
        const someMatch = text.match(/^Some (.+?)\.$/);
        if (someMatch) {
            const nameZh = TranslationService.translations.get(someMatch[1]);
            if (nameZh) return `一些${nameZh}.`;
        }

        // Dynamic pattern: "This is a/an X."
        const thisIsMatch = text.match(/^This is an? (.+?)\.$/);
        if (thisIsMatch) {
            const nameZh = TranslationService.translations.get(thisIsMatch[1]);
            if (nameZh) return `这是${nameZh}.`;
        }

        // Fallback: try exact item/entity name lookup (for if_settext with item names)
        const nameMatch = TranslationService.translations.get(text);
        if (nameMatch) return nameMatch;

        return text;
    }

    /**
     * Check if translations are available.
     */
    static hasTranslations(): boolean {
        if (!TranslationService.loaded) {
            TranslationService.load();
        }
        return TranslationService.translations.size > 0;
    }

    /**
     * Reload translations (for hot-reload during development).
     */
    static reload(): void {
        TranslationService.loaded = false;
        TranslationService.load();
    }
}

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

/**
 * Simple translation service for i18n support.
 * Loads translation dictionaries from JSON files.
 * Supports English (default) and Chinese.
 */
export default class TranslationService {
    private static translations: Map<string, string> = new Map();
    private static loaded: boolean = false;

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
            return `${prefix}恭喜你，你的${skillZh}等级提升了！`;
        }

        // Dynamic pattern: "Your SKILL level is now NUMBER." or "Your hitpoints are now NUMBER."
        const levelNowMatch = text.match(/^Your (.+?) (?:level is|are) now (\d+)\.$/);
        if (levelNowMatch) {
            const skill = levelNowMatch[1];
            const level = levelNowMatch[2];
            const skillZh = LEVELUP_SKILL_ZH[skill] ?? skill;
            return `你的${skillZh}等级现在是 ${level}。`;
        }

        // Dynamic pattern: "You need a @dbl@Prayer level of X to use Y."
        const prayerLevelMatch = text.match(/^You need a (@dbl@)?Prayer level of (\d+) to use (.+)\.$/);
        if (prayerLevelMatch) {
            const colorTag = prayerLevelMatch[1] || '';
            const level = prayerLevelMatch[2];
            const prayerName = prayerLevelMatch[3];
            const translatedName = TranslationService.translations.get(prayerName) ?? prayerName;
            return `你需要${colorTag}${level}级祈祷才能使用${translatedName}。`;
        }

        // Dynamic pattern: "You do not have enough X Runes to cast this spell."
        const runeMatch = text.match(/^You do not have enough (.+) Runes to cast this spell\.$/);
        if (runeMatch) {
            const runeName = runeMatch[1];
            return `你没有足够的${runeName}符文来施放此法术。`;
        }

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

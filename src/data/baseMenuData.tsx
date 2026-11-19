import { MarketplaceMenu } from "../compositions/MenuFilters/Marketplace";
import { XboxLiveMenu } from "../compositions/MenuFilters/XboxLive";
import { GamesMenu } from "../compositions/MenuFilters/Games";
import { SettingsMenu } from "../compositions/MenuFilters/Settings";
import { MarketplaceMenuContent } from "../compositions/MenuContent/Marketplace";
import { XboxLiveMenuContent } from "../compositions/MenuContent/XboxLive";
import { GamesMenuContent } from "../compositions/MenuContent/Games";
import { SettingsMenuContent } from "../compositions/MenuContent/Settings";
import { MediaMenuContent } from "../compositions/MenuContent/Media";
import { BladeData, MenuDataState } from "../stores/menuStore"
import { MediaMenu } from "../compositions/MenuFilters/Media";

export const BaseMenuData: Record<string, BladeData> = {
    marketplace: {
        content: [{
            content: MarketplaceMenuContent,
            tabIndexX: 0,
            tabIndexY: 0,
            maxTabIndexX: 0,
            maxTabIndexY: 1,
        } as MenuDataState],
        filter: <MarketplaceMenu/>,
    } as BladeData,
    xboxLive: {
        content: [{
            content: XboxLiveMenuContent,
            tabIndexX: 0,
            tabIndexY: 0,
            maxTabIndexX: 0,
            maxTabIndexY: 5,
        } as MenuDataState ],
        filter: <XboxLiveMenu/>,
    } as BladeData,
    games: {
        content: [{
            content: GamesMenuContent,
            tabIndexX: 0,
            tabIndexY: 0,
            maxTabIndexX: 0,
            maxTabIndexY: 4,
        } as MenuDataState ],
        filter: <GamesMenu/>,
    } as BladeData,
    media: {
        content: [{
            content: MediaMenuContent,
            tabIndexX: 0,
            tabIndexY: 0,
            maxTabIndexX: 0,
            maxTabIndexY: 6,
        } as MenuDataState ],
        filter: <MediaMenu/>,
    } as BladeData,
    settings: {
        content: [{
            content: SettingsMenuContent,
            tabIndexX: 0,
            tabIndexY: 0,
            maxTabIndexX: 0,
            maxTabIndexY: 6,
        } as MenuDataState ],
        filter: <SettingsMenu/>,
    } as BladeData
}

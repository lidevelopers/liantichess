import { h, VNode, InsertHook } from 'snabbdom';

import * as cg from 'chessgroundx/types';
import * as util from 'chessgroundx/util';
import { read } from 'chessgroundx/fen';

import { _ } from './i18n';

import { MaterialDiff, calculateMaterialDiff } from './material'

export const ranksUCI = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] as const;
export type UCIRank = typeof ranksUCI[number];
export type UCIKey =  'a0' | `${cg.File}${UCIRank}`;
export type UCIOrig = UCIKey | cg.DropOrig;
export type PromotionSuffix = cg.Letter | "+" | "-" | "";

export type UCIMove = `${UCIOrig}${UCIKey}`; // TODO: this is missing suffix for promotion which is also part of the move
export type CGMove = `${cg.Orig}${cg.Key}`; // TODO: this is missing suffix for promotion which is also part of the move

export type ColorName = "White" | "Black" | "Red" | "Blue" | "Gold" | "Pink" | "Green";
export type PromotionType = "regular" | "shogi" | "kyoto";
export type TimeControlType = "incremental" | "byoyomi";
export type CountingType = "makruk" | "asean";
export type MaterialPointType = "janggi";
export type BoardMarkType = "campmate" | "none";
export type PieceSoundType = "regular" | "atomic" | "shogi";

export interface BoardFamily {
    dimensions: cg.BoardDimensions;
    cg: string;
    boardCSS: string[];
}

export interface PieceFamily {
    pieceCSS: string[];
}

export const BOARD_FAMILIES: { [key: string]: BoardFamily } = {
    standard8x8: { dimensions: { width: 8, height: 8 }, cg: "cg-512", boardCSS: ["8x8brown.svg", "8x8blue.svg", "8x8green.svg", "8x8maple.jpg", "8x8olive.jpg", "8x8santa.png", "8x8wood2.jpg", "8x8wood4.jpg", "8x8ic.svg", "8x8purple.svg"] },
    standard10x8: { dimensions: { width: 10, height: 8 }, cg: "cg-640", boardCSS: ["10x8brown.svg", "10x8blue.svg", "10x8green.svg", "10x8maple.jpg", "10x8olive.jpg"] },
    standard10x10: { dimensions: { width: 10, height: 10 }, cg: "cg-640-640", boardCSS: ["10x10brown.svg", "10x10blue.svg", "10x10green.svg", "10x10maple.jpg", "10x10olive.jpg"] },
    grand10x10: { dimensions: { width: 10, height: 10}, cg: "cg-640-640", boardCSS: ["Grandboard.svg", "10x10brown.svg", "10x10blue.svg", "10x10green.svg", "10x10maple.jpg", "10x10mapleGrand.png"] },
    makruk8x8: { dimensions: { width: 8, height: 8 }, cg: "cg-512", boardCSS: ["makruk2.svg", "makruk.svg", "makrukWhite.svg", "makruk.jpg", "makrukWood.png"] },
    sittuyin8x8: { dimensions: { width: 8, height: 8 }, cg: "cg-512", boardCSS: ["sittuyin2.svg", "sittuyin.svg", "sittuyin.jpg", "sittuyingreen.svg", "sittuyinGrainBrown.svg", "sittuyinWood.png"] },
    shogi9x9: { dimensions: { width: 9, height: 9 }, cg: "cg-576", boardCSS: ["shogi.svg", "Shogiban1.png", "Shogiban2.png", "shogic.svg", "ShogiMaple.png", 'ShogiGrayTexture.png', "ShogiSpace1.svg", "dobutsu.png", "ShogiOak.png"] },
    shogi7x7: { dimensions: { width: 7, height: 7 }, cg: "cg-448-516", boardCSS: ["ToriPlain.svg", "ToriWood.svg", "ToriDaySky.svg", "ToriNightSky.svg"] },
    shogi5x5: { dimensions: { width: 5, height: 5 }, cg: "cg-260", boardCSS: ["minishogi.svg", "MiniboardWood1.png", "MiniboardWood2.png", "MinishogiDobutsu.svg", "MinishogiDobutsu2.svg"] },
    shogi5x6: { dimensions: { width: 5, height: 6 }, cg: "cg-260-360", boardCSS: ["gorogoro.svg", "gorogoroboard.svg", "gorogoro2.svg", "GorogoroWood.png"] },
    shogi3x4: { dimensions: { width: 3, height: 4 }, cg: "cg-156", boardCSS: ["doubutsuboard.svg", "dobutsu3x4.svg"] },
    xiangqi9x10: { dimensions: { width: 9, height: 10 }, cg: "cg-576-640", boardCSS: ["xiangqi.svg", "xiangqic.svg", "xiangqiCTexture.png", "xiangqiPaper.png", "xiangqiWood.png", "xiangqiDark.svg", "xiangqiWikimedia.svg", "xiangqiLightWood.png", "xiangqiSand.svg"] },
    xiangqi7x7: { dimensions: { width: 7, height: 7 }, cg: "cg-448", boardCSS: ["minixiangqi.svg", "minixiangqiw.png", "minixqlg.svg"] },
    janggi9x10: { dimensions: { width: 9, height: 10 }, cg: "cg-576-640", boardCSS: ["JanggiBrown.svg", "JanggiPaper.png", "JanggiWood.png", "JanggiDark.svg", "JanggiWoodDark.svg", "JanggiStone.svg"] },
    shogun8x8: { dimensions: { width: 8, height: 8 }, cg: "cg-512", boardCSS: ["ShogunPlain.svg", "ShogunMaple.png", "ShogunMaple2.png", "ShogunBlue.svg", "8x8brown.svg", "8x8maple.jpg"] },
    chak9x9:{ dimensions: { width: 9, height: 9 }, cg: "cg-540", boardCSS: ["StandardChakBoard.svg", "ColoredChakBoard.svg", "ChakArt.jpg"] },
    chennis7x7:{ dimensions: { width: 7, height: 7 }, cg: "cg-448", boardCSS: ["WimbledonBoard.svg", "FrenchOpenBoard.svg", "USOpenBoard.svg"] },
};

export const PIECE_FAMILIES: { [key: string]: PieceFamily } = {
    standard: { pieceCSS: ["standard", "green", "alpha", "chess_kaneo", "santa", "maestro"] },
    capa: { pieceCSS: ["capa0", "capa1", "capa2", "capa3", "capa4", "capa5"] },
    seirawan: { pieceCSS: ["seir1", "seir0", "seir2", "seir3", "seir4", "seir5"] },
    makruk: { pieceCSS: ["makrukwb", "makrukwr", "makruk", "makruks", "makruki"] },
    sittuyin: { pieceCSS: ["sittuyins", "sittuyinkagr", "sittuyinkabr", "sittuyinm", "sittuyini"] },
    asean: { pieceCSS: ["aseani", "aseanm", "aseanc", "aseans"] },
    shogi: { pieceCSS: ["shogik", "shogi", "shogiw", "shogip", "shogim", "shogip3d", "shogikw3d", "shogid", "shogiim", "shogibw", "portk", "porti"] },
    kyoto: { pieceCSS: ["kyoto", "kyotok", "kyotoks", "kyotoi", "kyotod"] },
    dobutsu: { pieceCSS: ["dobutsu"] },
    tori: { pieceCSS: ["torii", "torik", "torim", "porti"] },
    xiangqi: { pieceCSS: ["xiangqi2d", "xiangqi2di", "xiangqi", "xiangqict3", "xiangqihnz", "xiangqict2", "xiangqihnzw", "xiangqict2w", "xiangqiwikim", "xiangqiKa", "xiangqittxqhnz", "xiangqittxqintl"] },
    janggi: { pieceCSS: ["janggihb", "janggihg", "janggiikak", "janggiikaw", "janggikak", "janggikaw", "janggiib", "janggiig"] },
    shako: { pieceCSS: ["shako0", "shako1", "shako2"] },
    shogun: { pieceCSS: ["shogun0", "shogun1", "shogun2", "shogun3", "shogun4", "shogun5"] },
    orda: { pieceCSS: ["orda0", "orda1"] },
    synochess: { pieceCSS: ["synochess0", "synochess1", "synochess2", "synochess3", "synochess4", "synochess5"] },
    hoppel: { pieceCSS: ["hoppel0", "hoppel1", "hoppel2"] },
    shinobi: { pieceCSS: ["shinobi0", "shinobi1"] },
    empire: { pieceCSS: ["empire0", "empire1"] },
    ordamirror: { pieceCSS: ["ordamirror0", "ordamirror1"] },
    chak: { pieceCSS: ["chak0"] },
    chennis: { pieceCSS: ["chennis0", "chennis1", "chennis2"] },
};

type MandatoryPromotionPredicate = (role: cg.Role, orig: cg.Orig, dest: cg.Key, color: cg.Color) => boolean;

const alwaysMandatory: MandatoryPromotionPredicate = () => true;

function distanceBased(required: { [ letter: string ]: number }, boardHeight: number) : MandatoryPromotionPredicate {
    return (role: cg.Role, _orig: cg.Key, dest: cg.Key, color: cg.Color) => {
        const letter = util.letterOf(role);
        return (letter in required) ? distFromLastRank(dest, color, boardHeight) < required[letter] : false;
    };
}

function distFromLastRank(dest: cg.Key, color: cg.Color, boardHeight: number) : number {
    const rank = util.key2pos(dest)[1];
    return (color === "white") ? boardHeight - rank - 1 : rank;
}

export class Variant {
    readonly name: string;
    private readonly _displayName: string;
    displayName(chess960 = false) { return _(this._displayName).toUpperCase() + (chess960 ? "960" : ""); }
    private readonly _tooltip: () => string;
    tooltip() { return this._tooltip(); }
    readonly startFen: string;

    readonly board: keyof typeof BOARD_FAMILIES;
    private readonly boardFamily: BoardFamily;
    get boardDimensions() { return this.boardFamily.dimensions; }
    get boardWidth() { return this.boardDimensions.width; }
    get boardHeight() { return this.boardDimensions.height; }
    get cg() { return this.boardFamily.cg; }
    get boardCSS() { return this.boardFamily.boardCSS; }

    readonly piece: keyof typeof PIECE_FAMILIES;
    private readonly pieceFamily: PieceFamily;
    get pieceCSS() { return this.pieceFamily.pieceCSS; }

    readonly firstColor: ColorName;
    readonly secondColor: ColorName;

    readonly pieceRoles: Record<cg.Color, cg.Role[]>;
    readonly pocket: boolean;
    readonly pocketRoles: Record<cg.Color, cg.Role[]> | undefined;
    readonly kingRoles: cg.Role[];

    readonly promotion: PromotionType;
    readonly promotionOrder: PromotionSuffix[];
    readonly promoteableRoles: cg.Role[];
    readonly isMandatoryPromotion: MandatoryPromotionPredicate;
    readonly timeControl: TimeControlType;
    readonly counting?: CountingType;
    readonly materialPoint?: MaterialPointType;
    readonly enPassant: boolean;
    readonly autoPromoteable: boolean;
    readonly captureToHand: boolean;
    readonly gate: boolean;
    readonly pass: boolean;
    readonly setup: boolean;
    readonly boardMark: BoardMarkType;
    readonly showPromoted: boolean;
    readonly showMaterialDiff : boolean;
    readonly initialMaterialImbalance : MaterialDiff;

    readonly alternateStart?: { [ name: string ]: string };

    readonly chess960: boolean;

    private readonly _icon: string;
    private readonly _icon960: string;
    icon(chess960 = false) { return chess960 ? this._icon960 : this._icon; }
    readonly pieceSound: PieceSoundType;

    constructor(data: VariantConfig) {
        this.name = data.name;
        this._displayName = data.displayName ?? data.name;
        this._tooltip = data.tooltip;
        this.startFen = data.startFen;

        this.board = data.board;
        this.boardFamily = BOARD_FAMILIES[data.board];

        this.piece = data.piece;
        this.pieceFamily = PIECE_FAMILIES[data.piece];

        this.firstColor = data.firstColor ?? "White";
        this.secondColor = data.secondColor ?? "Black";
        this.pieceRoles = {
            white: data.pieceLetters.map(util.roleOf),
            black: (data.pieceLetters2 ?? data.pieceLetters).map(util.roleOf)
        };
        this.pocket = !!(data.pocketLetters || data.pocketLetters2);
        this.pocketRoles = data.pocketLetters ? {
            white: data.pocketLetters.map(util.roleOf),
            black: (data.pocketLetters2 ?? data.pocketLetters).map(util.roleOf),
        } :
            undefined;
        this.kingRoles = data.kingLetters?.map(util.roleOf) ?? ["k-piece"];

        this.promotion = data.promotion ?? "regular";
        this.promotionOrder = data.promotionOrder ?? (this.promotion === "shogi" || this.promotion === "kyoto" ? ["+", ""] : ["q", "c", "e", "a", "h", "n", "r", "b", "p"]);
        this.promoteableRoles = data.promoteableLetters?.map(util.roleOf) ?? ["p-piece"];
        this.isMandatoryPromotion = data.isMandatoryPromotion ?? alwaysMandatory;
        this.timeControl = data.timeControl ?? "incremental";
        this.counting = data.counting;
        this.materialPoint = data.materialPoint;
        this.enPassant = data.enPassant ?? false;
        this.autoPromoteable = this.promotionOrder.length > 2;
        this.captureToHand = data.captureToHand ?? false;
        this.gate = data.gate ?? false;
        this.pass = data.pass ?? false;
        this.setup = data.setup ?? false;
        this.boardMark = data.boardMark ?? 'none';
        this.showPromoted = data.showPromoted ?? false;
        this.showMaterialDiff = !this.captureToHand;
        this.initialMaterialImbalance = this.showMaterialDiff ? calculateMaterialDiff(this) : new Map();

        this.alternateStart = data.alternateStart;

        this.chess960 = data.chess960 ?? false;

        this._icon = data.icon;
        this._icon960 = data.icon960 ?? data.icon;
        this.pieceSound = data.pieceSound ?? "regular";
    }
}

interface VariantConfig {
    name: string; // The name of this variant as defined in Fairy-Stockfish

    displayName?: string; // The display name of this variant for use on the website

    tooltip: () => string; // The tooltip of this variant when its name is hovered
    startFen: string; // The FEN string that represents the starting position
    board: keyof typeof BOARD_FAMILIES; // The board style family
    piece: keyof typeof PIECE_FAMILIES; // The piece style family

    firstColor?: ColorName; // The name of the first-mover's color
    secondColor?: ColorName; // The name of the second-mover's color
    pieceLetters: cg.Letter[]; // The letters of pieces available for the first-mover
    pieceLetters2?: cg.Letter[]; // The letters of pieces available for the second-mover IF it is different from the first-mover
    pocketLetters?: cg.Letter[]; // The letters of pieces in the pocket of the first-mover
    pocketLetters2?: cg.Letter[]; // The letters of pieces in the pocket of the second-mover IF it is different from the first-mover
    kingLetters?: cg.Letter[]; // The letters of the piece(s) that will be marked for check

    promotion?: PromotionType; // The type of promotion of this variant
        // (default) "regular" = Chess-style, pawns promote to one or more other pieces
        // "shogi" = Shogi-style, multiple pieces can promote, each piece has a specific piece type it promotes to
        // "kyoto" = Kyoto Shogi, like shogi, but pieces can also demote and can be dropped in promoted state
    promotionOrder?: PromotionSuffix[]; // The order of pieces to be shown in promotion choice
    promoteableLetters?: cg.Letter[]; // The letters of pieces that can promote
    isMandatoryPromotion?: MandatoryPromotionPredicate; // Specific condition to determine if a piece promotion is mandatory
    timeControl?: TimeControlType; // Default time control type
        // (default) "incremental" = Fischer increment. An amount of time is added to the clock after each move
        // "byoyomi" = Overtime. An amount of time is given for each move after the main time runs out
    counting?: CountingType; // Counting type.
        // Specifically used for SEA variants
    materialPoint?: MaterialPointType; // Material point display.
        // Specifically used for Janggi but other variants can possibly use this too
    captureToHand?: boolean; // Whether captured pieces are added to the pocket
    gate?: boolean; // Whether this variant has piece gating.
        // Specifically used for S-Chess
    pass?: boolean; // Whether this variant allows players to pass their turn without moving any pieces
    setup?: boolean; // Whether this variant has a pre-game setup phase issued by the server
    boardMark?: BoardMarkType; // Board mark type
        // "campmate" = Mark the last row of each side to indicate that moving the king to these squares wins the game
        // (default) "none" = Mark nothing
    pieceSound?: PieceSoundType; // Piece sound type
        // (default) "regular" = Regular chess piece sound
        // "atomic" = Atomic piece sound, with explosion on capture
        // "shogi" = Shogi piece sound, indicating relatively flat pieces instead of miniature-type pieces

    showPromoted?: boolean; // Whether promoted pieces should be marked in the FEN.
        // Specifically used for Makruk's promoted pawns to display them differently from a regular met

    enPassant?: boolean; // Whether this variant has en passant
    alternateStart?: {[key:string]: string}; // Alternate starting positions, possibly handicap positions
    chess960?: boolean; // Whether this variant has a random mode
    icon: string; // The icon letter in the site's font
    icon960?: string; // The icon of the 960 version
}

export const VARIANTS: { [name: string]: Variant } = {
    antichess: new Variant({
        name: "antichess", tooltip: () => _("capture all pieces."),
        startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        promotionOrder: ["k", "q", "r", "b", "n", "p"],
        enPassant: true,
        chess960: true, icon: "♔", icon960: "♔",
    }),

    losers: new Variant({
        name: "losers", tooltip: () => _("losers Chess."),
        startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        enPassant: true,
        chess960: true, icon: "♔", icon960: "♔",
    }),

    anti_antichess: new Variant({
        name: "anti_antichess", displayName: "anti-antichess", tooltip: () => _("loose at antichess"),
        startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        enPassant: true,
        chess960: true, icon: "♔", icon960: "♔",
    }),

    antiatomic: new Variant({   
        name: "antiatomic", tooltip: () => _("Atomic+Antichess"),
        startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        enPassant: true,
        chess960: true, icon: "♔", icon960: "♔",
    }),

    antihouse: new Variant({
        name: "antihouse", tooltip: () => _("antichess + crazyhouse."),
        startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        pocketLetters: ["p", "n", "b", "r", "q", "k"],
        enPassant: true, drop: true,
        chess960: true, icon: "♔", icon960: "♔",
    }),

    antipawns: new Variant({
        name: "antipawns", tooltip: () => _("antichess + horde but diff pawn structure."),
        startFen: "pppppppp/pppppppp/pppppppp/8/8/PPPPPPPP/PPPPPPPP/PPPPPPPP w - - 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        enPassant: true,
        icon: "♔",
    }),

    coffee_3check: new Variant({
        name: "coffee_3check", displayName: "coffee-3check", tooltip: () => _("Keep three checks."),
        startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 3+3 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        enPassant: true,
        chess960: true, icon: "♔", icon960: "♔",
    }),

    coffeerace: new Variant({
        name: "coffeerace", tooltip: () => _("AntiRacingkings."),
        startFen: "8/8/8/8/8/8/krbnNBRK/qrbnNBRQ w - - 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        enPassant: true,
        icon: "♔",
    }),

    coffeehouse: new Variant({
        name: "coffeehouse", tooltip: () => _("antichess + crazyhouse."),
        startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        pocketLetters: ["p", "n", "b", "r", "q"],
        enPassant: true, captureToHand: true,
        chess960: true, icon: "♔", icon960: "♔",
    }),

    coffeehill: new Variant({
        name: "coffeehill", tooltip: () => _("Antichess + koth"),
        startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        enPassant: true,
        chess960: true, icon: "♔", icon960: "♔",
    }),

    antiplacement: new Variant({
        name: "antiplacement", tooltip: () => _("Choose where your pieces start."),
        startFen: "8/pppppppp/8/8/8/8/PPPPPPPP/8[KQRRBBNNkqrrbbnn] w - - 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        pocketLetters: ["n", "b", "r", "q", "k"],
        enPassant: true,
        icon: "♔",
    }),

    atomic_giveaway_hill: new Variant({
        name: "atomic_giveaway_hill", displayName: "atomic-giveaway-hill", tooltip: () => _("Atomic + Antichess + koth"),
        startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        board: "standard8x8", piece: "standard",
        pieceLetters: ["k", "q", "r", "b", "n", "p"],
        enPassant: true,
        chess960: true, icon: "♔", icon960: "♔",
    }),
};

export const variants = Object.keys(VARIANTS);
const disabledVariants = [ "gothic", "gothhouse", "embassy", "gorogoro" ];
export const enabledVariants = variants.filter(v => !disabledVariants.includes(v));

const variantGroups: { [ key: string ]: { variants: string[] } } = {
    antichess: { variants: [ "antichess", "losers", "anti_antichess" ] },
    anti:      { variants: [ "antiatomic", "antihouse", "antipawns" ] },
    coffee:    { variants: [ "coffee_3check", "coffeerace", "coffeehouse", "coffeehill" ] },
    misc:      { variants: [ "antiplacement", "atomic_giveaway_hill" ] },
};

function variantGroupLabel(group: string): string {
    const groups: {[index: string]: string} = {
        standard: _("Antichess Core Variants"),
        anti: _("Antichess based Variants"),
        coffee: _("Other Variants with some Antichess"),
        misc: _("Other Antichess Variants"),
    }
    return groups[group];
}

export function selectVariant(id: string, selected: string, onChange: EventListener, hookInsert: InsertHook): VNode {
    return h('select#' + id, {
        props: { name: id },
        on: { change: onChange },
        hook: { insert: hookInsert },
    },
        Object.keys(variantGroups).map(g => {
            const group = variantGroups[g];
            return h('optgroup', { props: { label: variantGroupLabel(g) } }, group.variants.map(v => {
                const variant = VARIANTS[v];
                return h('option', {
                    props: { value: v, title: variant.tooltip() },
                    attrs: { selected: v === selected },
                }, variant.displayName(false));
            }));
        }),
    );
}

const handicapKeywords = [ "HC", "Handicap", "Odds" ];
export function isHandicap(name: string): boolean {
    return handicapKeywords.some(keyword => name.endsWith(keyword));
}

export function hasCastling(variant: Variant, color: cg.Color): boolean {
    if (variant.name === 'placement') return true;
    const castl = variant.startFen.split(' ')[2];
    if (color === 'white') {
        return castl.includes('KQ');
    } else {
        return castl.includes('kq');
    }
}

export function uci2cg(move: string): string {
    return move.replace(/10/g, ":");
}

export function uci2LastMove(move: string | undefined): cg.Move | undefined {
    if (!move) return undefined;
    let moveStr = uci2cg(move);
    if (moveStr.startsWith('+')) moveStr = moveStr.slice(1);
    return [ moveStr.slice(0, 2) as cg.Orig, moveStr.slice(2) as cg.Key ];
}

export function cg2uci(move: string): string {
    return move.replace(/:/g, "10");
}

// TODO Will be deprecated after WASM Fairy integration
export function validFen(variant: Variant, fen: string): boolean {
    const as = variant.alternateStart;
    if (as !== undefined) {
        if (Object.keys(as).some((key) => {return as[key].includes(fen);})) return true;
    }
    const variantName = variant.name;
    const startfen = variant.startFen;
    const start = startfen.split(' ');
    const parts = fen.split(' ');

    // Need starting color
    if (parts.length < 2) return false;

    // Allowed characters in placement part
    const placement = parts[0];
    const startPlacement = start[0];
    let good = startPlacement + ((variantName === "orda") ? "Hq" : "") + ((variantName === "dobutsu") ? "Hh" : "") + "~+0123456789[]-";
    const alien = (element: string) => !good.includes(element);
    if (placement.split('').some(alien)) return false;

    // Brackets paired
    if (lc(placement, '[', false) !== lc(placement, ']', false)) return false;


    // Check with chessgroundx's parsing
    const boardState = read(placement, variant.boardDimensions);
    const width = variant.boardDimensions.width;
    const height = variant.boardDimensions.height;

    // Correct board size
    if (lc(placement, '/', false) < height - 1) return false;
    for (const [k, _] of boardState.pieces) {
        const pos = util.key2pos(k);
        if (pos[0] > width - 1 || pos[1] > height - 1)
            return false;
    }

    // Touching kings
    if (variantName !== 'atomic' && touchingKings(boardState.pieces)) return false;

    // Starting colors
    if (parts[1] !== 'b' && parts[1] !== 'w') return false;

    // Castling rights (piece virginity)
    good = (variantName === 'seirawan' || variantName === 'shouse') ? 'KQABCDEFGHkqabcdefgh-' : start[2] + "-";
    const wrong = (element: string) => !good.includes(element);
    const rookStart: { [right: string]: cg.Pos } = {
        K: (variantName === 'shako') ? [width - 2, 1] : [width - 1, 0],
        Q: (variantName === 'shako') ? [1, 1] : [0, 0],
        k: (variantName === 'shako') ? [width - 2, height - 2] : [width - 1, height - 1],
        q: (variantName === 'shako') ? [1, height - 2] : [0, height - 1],
    };
    if (parts.length > 2 && variantName !== 'dobutsu') {
        if (parts[2].split('').some(wrong)) return false;

        // TODO: Checking S-chess960 FEN is tricky
        // Editor and Analysis board needs chess960 checkbox similar to new game dialog first

        // It is better to enable castling right validation for seirawan and shouse as well to be safe
        //if (variantName !== 'seirawan' && variantName !== 'shouse') {
            // Castling right need rooks and king placed in starting square
            // capablanca: "rnabqkbcnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNABQKBCNR w KQkq - 0 1",
            // shako: "c8c/ernbqkbnre/pppppppppp/10/10/10/10/PPPPPPPPPP/ERNBQKBNRE/C8C w KQkq - 0 1",
            for (const c of parts[2]) {
                const piece = rookStart[c] ? boardState.pieces.get(util.pos2key(rookStart[c])) : undefined;
                const color = c === c.toUpperCase() ? 'white' : 'black';
                switch (c) {
                    case 'K':
                    case 'Q':
                    case 'k':
                    case 'q':
                        if (!piece || !util.samePiece(piece, { role: 'r-piece', color: color }))
                            return false;
                        // TODO check king position
                        break;
                    // TODO Gating right
                }
            }
        //}
    }

    // Number of kings
    const king = util.letterOf(variant.kingRoles[0]);
    if (lc(placement, king, false) !== 1 || lc(placement, king, true) !== 1) return false;

    return true;
}

function diff(a: number, b:number): number {
    return Math.abs(a - b);
}

function touchingKings(pieces: cg.Pieces): boolean {
    let wk = 'xx', bk = 'zz';
    for (const [k, p] of pieces) {
        if (p.role === "k-piece") {
            if (p.color === 'white') wk = k;
            if (p.color === 'black') bk = k;
        }
    }
    const touching = diff(wk.charCodeAt(0), bk.charCodeAt(0)) <= 1 && diff(wk.charCodeAt(1), bk.charCodeAt(1)) <= 1;
    return touching;
}

// pocket part of the FEN (including brackets)
export function getPockets(fen: string): string {
    const placement = fen.split(" ")[0];
    let pockets = "";
    const bracketPos = placement.indexOf("[");
    if (bracketPos !== -1)
        pockets = placement.slice(bracketPos);
    return pockets;
}

// Get counting information for makruk et al
export function getCounting(fen: string): [number, number, string, string] {
    const parts = fen.split(" ");

    let countingPly = Number(parts[4]);
    if (isNaN(countingPly)) countingPly = 0;

    let countingLimit = Number(parts[3]);
    if (isNaN(countingLimit)) countingLimit = 0;

    const board = parts[0];
    const whitePieces = (board.match(/[A-Z]/g) || []).length;
    const blackPieces = (board.match(/[a-z]/g) || []).length;
    const pawns = (board.match(/[Pp]/g) || []).length;
    const countingType = (countingLimit === 0) ? 'none' : (pawns === 0 && (whitePieces <= 1 || blackPieces <= 1) ? 'piece' : 'board');

    const sideToMove = parts[1];
    const opponent = (sideToMove === 'w') ? 'b' : 'w';
    const countingSide = (countingType === 'none' || countingPly === 0) ? '' : ((countingPly % 2 === 0) ? sideToMove : opponent);

    return [countingPly, countingLimit, countingSide, countingType];
}

// Get janggi material points
export function getJanggiPoints(board: string): number[] {
    let choPoint = 0;
    let hanPoint = 1.5;
    for (const c of board) {
        switch (c) {
            case 'P': choPoint += 2; break;
            case 'A':
            case 'B': choPoint += 3; break;
            case 'N': choPoint += 5; break;
            case 'C': choPoint += 7; break;
            case 'R': choPoint += 13; break;

            case 'p': hanPoint += 2; break;
            case 'a':
            case 'b': hanPoint += 3; break;
            case 'n': hanPoint += 5; break;
            case 'c': hanPoint += 7; break;
            case 'r': hanPoint += 13; break;
        }
    }
    return [choPoint, hanPoint];
}

export function unpromotedRole(variant: Variant, piece: cg.Piece): cg.Role {
    if (piece.promoted) {
        switch (variant.promotion) {
            case 'shogi':
            case 'kyoto':
                return piece.role.slice(1) as cg.Role;
            default:
                return 'p-piece';
        }
    } else {
        return piece.role;
    }
}

export function promotedRole(variant: Variant, piece: cg.Piece): cg.Role {
    if (!piece.promoted && variant.promoteableRoles.includes(piece.role)) {
        switch (variant.promotion) {
            case 'shogi':
            case 'kyoto':
                return 'p' + piece.role as cg.Role;
            default:
                return util.roleOf(variant.promotionOrder[0] as cg.Letter);
        }
    } else {
        return piece.role;
    }
}

// Convert a list of moves to chessground destination
export function moveDests(legalMoves: UCIMove[]): cg.Dests {
    const dests: cg.Dests = new Map();
    legalMoves.map(uci2cg).forEach(move => {
        const orig = move.slice(0, 2) as cg.Key;
        const dest = move.slice(2, 4) as cg.Key;
        if (dests.has(orig))
            dests.get(orig)!.push(dest);
        else
            dests.set(orig, [ dest ]);
    });
    return dests;
}

// Count given letter occurences in a string
export function lc(str: string, letter: string, uppercase: boolean): number {
    if (uppercase)
        letter = letter.toUpperCase();
    else
        letter = letter.toLowerCase();
    let letterCount = 0;
    for (let position = 0; position < str.length; position++)
        if (str.charAt(position) === letter)
            letterCount += 1;
    return letterCount;
}

// Convert the string to uppercase if color is white,
// or convert it to lowercase if color is black
export function colorCase(color: cg.Color, str: string): string {
    if (color === 'white')
        return str.toUpperCase();
    else
        return str.toLowerCase();
}

export function notation(variant: Variant): cg.Notation {
    let cgNotation = cg.Notation.ALGEBRAIC;

    switch (variant.name) {
        case 'janggi':
            cgNotation = cg.Notation.JANGGI;
            break;
        case 'shogi':
        case 'minishogi':
        case 'kyotoshogi':
        case 'dobutsu':
        case 'gorogoro':
        case 'gorogoroplus':
        case 'torishogi':
            cgNotation = cg.Notation.SHOGI_ARBNUM;
            break;
        case 'xiangqi':
        case 'minixiangqi':
        // XIANGQI_WXF can't handle Mmanchu banner piece!
            cgNotation = cg.Notation.XIANGQI_ARBNUM;
            break;
    }
    return cgNotation;
}

export function colorIcon(variant: string, color: string) {
    if (variantGroups.shogi.variants.includes(variant)) {
        return (color === 'Black') ? 'icon-sente' : 'icon-gote';
    } else {
        return `icon-${color.toLowerCase()}`;
    }
}

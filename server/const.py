from settings import static_url

SCHEDULE_MAX_DAYS = 7
TOURNAMENT_SPOTLIGHTS_MAX = 4

# Max number of lobby chat lines (deque limit)
MAX_CHAT_LINES = 100

# Minimum number of rated games needed
HIGHSCORE_MIN_GAMES = 10

# Show the number of spectators only after this limit
MAX_NAMED_SPECTATORS = 20

# tournament status
T_CREATED, T_STARTED, T_ABORTED, T_FINISHED, T_ARCHIVED = range(5)

# tournament frequency
HOURLY, DAILY, WEEKLY, MONTHLY, YEARLY, MARATHON, SHIELD = "h", "d", "w", "m", "y", "a", "s"

# tournament pairing
ARENA, RR, SWISS = range(3)

# translations
LANGUAGES = [
    "de",
    "en",
    "es",
    "gl_ES",
    "fr",
    "hu",
    "it",
    "ja",
    "ko",
    "nl",
    "pl",
    "pt",
    "ru",
    "th",
    "tr",
    "zh_CN",
    "zh_TW",
]

# fishnet work types
MOVE, ANALYSIS = 0, 1

# game types
CASUAL, RATED, IMPORTED = 0, 1, 2

# game status
(
    CREATED,
    STARTED,
    ABORTED,
    MATE,
    RESIGN,
    STALEMATE,
    TIMEOUT,
    DRAW,
    FLAG,
    ABANDONE,
    CHEAT,
    BYEGAME,
    INVALIDMOVE,
    UNKNOWNFINISH,
    VARIANTEND,
    CLAIM,
) = range(-2, 14)

LOSERS = {
    "abandone": ABANDONE,
    "abort": ABORTED,
    "resign": RESIGN,
    "flag": FLAG,
}

GRANDS = ("xiangqi", "manchu", "grand", "grandhouse", "shako", "janggi")

CONSERVATIVE_CAPA_FEN = "arnbqkbnrc/pppppppppp/10/10/10/10/PPPPPPPPPP/ARNBQKBNRC w KQkq - 0 1"

VARIANTS = (
    "antichess",
    "antichess960",
    "losers",
    "losers960",
    "anti_antichess",
    "anti_antichess960",
    "antiatomic",
    "antiatomic960",
    "antihouse",
    "antihouse960",
    "antipawns",
    "coffee_3check",
    "coffee_3check960",
    "coffeerace",
    "coffeehouse",
    "coffeehouse960",
    "coffeehill",
    "coffeehill960",
    "antiplacement",
    "atomic_giveaway_hill",
    "atomic_giveaway_hill960",
)

VARIANT_ICONS = {
    "antichess": "♔",
    "antichess960": "♔",
    "losers": "♔",
    "losers960": "♔",
    "anti_antichess": "♔",
    "anti_antichess960": "♔",
    "antiatomic": "♔",
    "antiatomic960": "♔",
    "antihouse": "♔",
    "antihouse960": "♔",
    "antipawns": "♔",
    "coffee_3check": "♔",
    "coffee_3check960": "♔",
    "coffeerace": "♔",
    "coffeehouse": "♔",
    "coffeehouse960": "♔",
    "coffeehill": "♔",
    "coffeehill960": "♔",
    "antiplacement": "♔",
    "atomic_giveaway_hill": "♔",
    "atomic_giveaway_hill960": "♔",
}

VARIANT_960_TO_PGN = {
    "antichess": "Antichess",
    "losers": "Losers960",
    "anti_antichess": "Anti_antichess960",
    "antiatomic": "Antiatomic960",
    "antihouse": "Antihouse960",
    "antipawns": "Antipawns960",
    "coffee_3check": "Coffee_3check960",
    "coffeerace": "Coffeerace960",
    "coffeehouse": "Coffeehouse960",
    "coffeehill": "Coffeehill960",
    "antiplacement": "Antiplacement960",
    "atomic_giveaway_hill": "Atomic_giveaway_hill960",
}

CATEGORIES = {
    "antichess": (
        "antichess",
        "antichess960",
        "losers",
        "losers960",
        "anti_antichess",
        "anti_antichess960",
    ),
    "anti": (
        "antiatomic",
        "antiatomic960",
        "antihouse",
        "antihouse960",
        "antipawns",
    ),
    "coffee": (
        "coffee_3check",
        "coffee_3check960",
        "coffeerace",
        "coffeehouse",
        "coffeehouse960",
        "coffeehill",
        "coffeehill960",
    ),
    "misc": ("antiplacement", "atomic_giveaway_hill", "atomic_giveaway_hill960"),
}

VARIANT_GROUPS = {}
for categ in CATEGORIES:
    for variant in CATEGORIES[categ]:
        VARIANT_GROUPS[variant] = categ

TROPHIES = {
    "top1": (static_url("images/trophy/Big-Gold-Cup.png"), "Champion!"),
    "top10": (static_url("images/trophy/Big-Silver-Cup.png"), "Top 10!"),
    "top50": (static_url("images/trophy/Fancy-Gold-Cup.png"), "Top 50!"),
    "top100": (static_url("images/trophy/Gold-Cup.png"), "Top 100!"),
    "shield": (static_url("images/trophy/shield-gold.png"), "Shield"),
    "acwc21": (static_url("images/trophy/acwc21.png"), "2021 Champion"),
    "acwc22": (static_url("images/trophy/acwc22.png"), "2022 Champion"),
    "acswc22": (static_url("images/trophy/acswc22.png"), "Supercup 2022 Champion"),
    "wacwc22": (static_url("images/trophy/wacwc22.png"), "Woman Champion 2022"),
    "developer": (static_url("images/trophy/developer.png"), "Developer"),
    "moderator": (static_url("images/trophy/moderator.png"), "Moderator"),
    "marathon15": (static_url("images/trophy/marathon15.png"), "2022 Spring Marathon Top 15!"),
    "marathon5": (static_url("images/trophy/marathon5.png"), "2022 Spring Marathon Top 5!"),
    "marathon1": (static_url("images/trophy/marathon1.png"), "2022 Spring Marathon Winner!"),
}

TROPHY_KIND = (
    "liantichess",
    "antichess",
    "antichess960",
    "losers",
    "losers960",
    "anti_antichess",
    "anti_antichess960",
    "antiatomic",
    "antiatomic960",
    "antihouse",
    "antihouse960",
    "antipawns",
    "coffee_3check",
    "coffee_3check960",
    "coffeerace",
    "coffeehouse",
    "coffeehouse960",
    "coffeehill",
    "coffeehill960",
    "antiplacement",
    "atomic_giveaway_hill",
    "atomic_giveaway_hill960",
)


def variant_display_name(variant):
    if variant == "anti_antichess":
        return "ANTI-ANTICHESS"
    elif variant == "anti_antichess960":
        return "ANTI-ANTICHESS960"
    elif variant == "coffee_3check":
        return "COFFEE-3CHECK"
    elif variant == "coffee_3check960":
        return "COFFEE-3CHECK960"
    elif variant == "atomic_giveaway_hill":
        return "ATOMIC-GIVEAWAY-HILL"
    elif variant == "atomic_giveaway_hill960":
        return "ATOMIC-GIVEAWAY-HILL960"
    else:
        return variant.upper()


#  Deferred translations!


def _(message):
    return message


TRANSLATED_PAIRING_SYSTEM_NAMES = {
    0: _("Arena"),
    1: _("Round-Robin"),
    2: _("Swiss"),
}

TRANSLATED_FREQUENCY_NAMES = {
    "h": _("Hourly"),
    "d": _("Daily"),
    "w": _("Weekly"),
    "m": _("Monthly"),
    "y": _("Yearly"),
    "a": _("Marathon"),
    "s": _("Shield"),
    "S": _("SEAturday"),
}

TRANSLATED_VARIANT_NAMES = {
    "chess": _("Chess"),
    "chess960": _("Chess960"),
    "crazyhouse": _("Crazyhouse"),
    "crazyhouse960": _("Crazyhouse960"),
    "placement": _("Placement"),
    "atomic": _("Atomic"),
    "atomic960": _("Atomic960"),
    "makruk": _("Makruk"),
    "makpong": _("Makpong"),
    "cambodian": _("Ouk Chaktrang"),
    "sittuyin": _("Sittuyin"),
    "asean": _("ASEAN"),
    "shogi": _("Shogi"),
    "minishogi": _("Minishogi"),
    "kyotoshogi": _("Kyoto Shogi"),
    "dobutsu": _("Dobutsu"),
    # Gorogoro is superseded by Gorogoro Plus
    # "gorogoro",
    "gorogoroplus": _("Gorogoro+"),
    "torishogi": _("Tori Shogi"),
    "xiangqi": _("Xiangqi"),
    "manchu": _("Manchu"),
    "janggi": _("Janggi"),
    "minixiangqi": _("Minixiangqi"),
    "capablanca": _("Capablanca"),
    "capablanca960": _("Capablanca960"),
    "capahouse": _("Capahouse"),
    "capahouse960": _("Capahouse960"),
    # We support to import/store/analyze these variants
    # but don't support to add them to leaderboard page
    # "gothic",
    # "gothhouse",
    # "embassy",
    "seirawan": _("S-Chess"),
    "seirawan960": _("S-Chess960"),
    "shouse": _("S-House"),
    "grand": _("Grand"),
    "grandhouse": _("Grandhouse"),
    "shogun": _("Shogun"),
    "shako": _("Shako"),
    "hoppelpoppel": _("Hoppel-Poppel"),
    "orda": _("Orda Chess"),
    "synochess": _("Synochess"),
    "shinobi": _("Shinobi"),
    "empire": _("Empire"),
    "ordamirror": _("Orda Mirror"),
    "chak": _("Chak"),
    "chennis": _("Chennis"),
}

del _

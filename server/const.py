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
    # some example custom trophy from lichess
    "acwc19": (static_url("images/trophy/acwc19.png"), "World Champion 2019"),
    "3wc21": (static_url("images/trophy/3wc21.png"), "World Champion 2021"),
}


def variant_display_name(variant):
    if variant == "seirawan":
        return "S-CHESS"
    elif variant == "seirawan960":
        return "S-CHESS960"
    elif variant == "shouse":
        return "S-HOUSE"
    elif variant == "cambodian":
        return "OUK CHAKTRANG"
    elif variant == "ordamirror":
        return "ORDA MIRROR"
    elif variant == "gorogoroplus":
        return "GOROGORO+"
    elif variant == "kyotoshogi":
        return "KYOTO SHOGI"
    elif variant == "torishogi":
        return "TORI SHOGI"
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
    "antichess": _("AntiChess"),
    "antichess960": _("AntiChess960"),
    "losers": _("LosersChess"),
    "losers960": _("LosersChess960"),
}

del _

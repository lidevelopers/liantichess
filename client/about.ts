import { h, VNode } from 'snabbdom';

import { _ } from './i18n';
import { model } from './main';


export function aboutView(): VNode[] {
    const untitled = [
        _("\"To me, how we've got here today is owing to Stockfish in a BIG way. They rallied global volunteers to come together in the open-source spirit and create such a powerful engine for FREE. That's a lot of great minds and computing power they've managed to harness."),
        _("Then we've got Lichess to thank. Lichess was also born out of the same open-source spirit, and it too drew in great people as well. Once Lichess incorporated Stockfish as its brains, the rest is history."),
        _("Lichess enables the online, real-time, and competitive aspects of game-play. They also bring the enormous power of Stockfish to the masses, who can now benefit from it without configuring a local GUI. I believe this development turns out to be of great consequence and significance."),
        _("Later on, developers close to the Lichess project eventually extended Stockfish into Multivariant-Stockfish, in order to support Crazyhouse et al. The father of Fairy-Stockfish, Fabian, is also one of those devs (still) working on that fork, and he later took several steps further in terms of variant support and extensibility. Thus Fairy-Stockfish was born, so powerful because it builds on the Stockfish project."),
        _("Then comes our beloved pychess-variants, which again very smartly harnesses the underlying superpowers of the big projects. Same online, real-time, and competitive aspects. Same clean and familiar Lichess look and feel. Plus the power of Stockfish!\""),
    ]
    return [
        h('div.about', [
            h('img.center', { attrs: { src: `${model["asset-url"]}/favicon/favicon-96x96.png` } }),
            h('h1', { attrs: { align: 'center' } }, _('About Liantichess')),
            h('p', _('Liantichess is a free, open-source chess server designed to play several chess variants.')),
            h('p', [
                // TODO Automate the generation of this list
                _("Currently supported games are "),
                h('a', { attrs: { href: 'https://liantichess.herokuapp.com/variants/antichess' } }, 'Antichess'),
                ", ",
                h('a', { attrs: { href: 'https://liantichess.herokuapp.com/variants/antichess960' } }, 'Antichess960'),
                ", ",

            h('hr'),
            h('p', [
                _('To play on Liantichess, you need to have an open and unmarked account on Lichess. '),
                _('Regarding Privacy and Terms of Service, the rules of lichess.org are also applied here. '),
                h('a', { attrs: { href: 'https://lichess.org/privacy' } }, 'Privacy'),
                ", ",
                h('a', { attrs: { href: 'https://lichess.org/terms-of-service' } }, 'ToS'),
            ]),
            h('hr'),
            h('p', untitled.map(paragraph => h('p', paragraph))),
        ]),
    ];
}

import '@material/web/iconbutton/filled-icon-button';
import '@material/web/iconbutton/filled-tonal-icon-button';
import '@material/web/iconbutton/outlined-icon-button';
import '@material/web/iconbutton/icon-button';

import m from 'mithril';
import { Icon } from '../icon';

export interface IconButtonAttrs {
    disabled?: boolean;
    elevated?: boolean;
    toggle?: boolean;
    href?: string;
    label?: string;
    target?: string;
    style?: any;
    icon: string;
    onclick?: (e: Event) => void;
    [key: string]: any;
}

export class FilledIconButton implements m.ClassComponent<IconButtonAttrs> {
    view({ attrs: { icon, ...other }, children }: m.Vnode<IconButtonAttrs>) {
        return m(
            'md-filled-icon-button',
            { ...other },
            m(Icon, { icon }),
            children
        );
    }
}

export class FilledTonalIconButton
    implements m.ClassComponent<IconButtonAttrs>
{
    view({
        attrs: { icon, onclick, ...other },
        children,
    }: m.Vnode<IconButtonAttrs>) {
        return m(
            'md-filled-tonal-icon-button',
            { icon, onclick, ...other },
            m(Icon, { icon }),
            children
        );
    }
}

export class OutlinedIconButton implements m.ClassComponent<IconButtonAttrs> {
    view({
        attrs: { icon, onclick, ...other },
        children,
    }: m.Vnode<IconButtonAttrs>) {
        return m(
            'md-outlined-icon-button',
            { icon, onclick, ...other },
            m(Icon, { icon }),
            children
        );
    }
}

export class StandardIconButton implements m.ClassComponent<IconButtonAttrs> {
    view({
        attrs: { disabled, label, icon, style, toggle, ...other },
        children,
    }: m.Vnode<IconButtonAttrs>) {
        return m(
            'md-icon-button',
            {
                disabled,
                label,
                toggle,
                ...other,
            },
            m(Icon, {
                style,
                icon,
            }),
            children
        );
    }
}

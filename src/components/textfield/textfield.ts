import '@material/web/textfield/filled-text-field';
import '@material/web/textfield/outlined-text-field';

import m from 'mithril';
import { Icon } from '../icon';

export interface TextFieldAttrs {
    label: string;
    value?: string;
    errorText?: string;
    trailingicon?: string;
    leadingicon?: string;
    supportingText?: string;
    ontrailinIconClick?: (e: Event) => void;
    onleadingIconClick?: (e: Event) => void;
    oninput?: (e: Event) => void;
    onclick?: (e: Event) => void;
    [key: string]: any;
}

export class FilledTextField implements m.ClassComponent<TextFieldAttrs> {
    view({
        attrs: {
            label,
            value,
            oninput,
            trailingIcon,
            leadingIcon,
            onleadingIconClick,
            ontrailinIconClick,
            onclick,
            ...other
        },
        children,
    }: m.Vnode<TextFieldAttrs>) {
        return m(
            'md-filled-text-field',
            { label, value, oninput, onclick, ...other },
            trailingIcon
                ? m('[slot=end]', m(Icon, {
                      style: {
                          cursor: ontrailinIconClick ? 'pointer' : 'cursor',
                      },
                      icon: trailingIcon,
                      slot: 'trailing-icon',
                      onclick: ontrailinIconClick,
                  }))
                : null,
            leadingIcon
                ? m(Icon, {
                      style: { cursor: 'cursor' },
                      icon: leadingIcon,
                      slot: 'leading-icon',
                      onclick: onleadingIconClick
                  })
                : null,
            children
        );
    }
}

export class OutlinedTextField implements m.ClassComponent<TextFieldAttrs> {
    view({
        attrs: {
            label,
            value,
            oninput,
            leadingicon: leadingIcon,
            trailingicon: trailingIcon,
            ontrailinIconClick: onTrailingIconClick,
            onleadingIconClick,
            supportingText,
            ...other
        },
        children,
    }: m.Vnode<TextFieldAttrs>) {
        return m(
            'md-outlined-text-field',
            {
                label,
                value,
                oninput,
                trailingicon: trailingIcon,
                supportingText,
                ...other,
            },
            trailingIcon
                ? m(Icon, {
                      style: {
                          cursor: onTrailingIconClick ? 'pointer' : 'cursor',
                      },
                      icon: trailingIcon,
                      slot: 'trailing-icon',
                      onclick: onTrailingIconClick,
                  })
                : null,
            leadingIcon
                ? m(Icon, {
                      icon: leadingIcon,
                      slot: 'leading-icon',
                      onclick: onleadingIconClick,
                  })
                : null,
            children
        );
    }
}

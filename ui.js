// ui.js — self-contained, non-blocking notification helpers (toast / progress /
// confirm / prompt) that replace the native alert/confirm/prompt dialogs.
//
// These depend only on a few DOM containers (#toastContainer, #appModalOverlay,
// #appModalBody, #appModalActions) defined in index.html — not on the map,
// Firebase, or any game state — so they live in their own module. Call
// installNotifications() once at startup to attach them to window.*, which is
// how the inline onclick handlers and the rest of the app reach them.

export function installNotifications() {
    // showToast(message, type, opts) — type: info|success|error|warn.
    // opts.duration ms (0 = sticky). opts.actionLabel + opts.onAction adds a button.
    // Returns a dismiss() function.
    window.showToast = function(message, type = 'info', opts = {}) {
        const container = document.getElementById('toastContainer');
        if (!container) { console.log(`[${type}] ${message}`); return () => {}; }
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const msg = document.createElement('span');
        msg.className = 'toast-msg';
        msg.innerHTML = message;
        toast.appendChild(msg);

        let timer = null;
        const dismiss = () => {
            if (timer) clearTimeout(timer);
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 200);
        };

        if (opts.actionLabel && typeof opts.onAction === 'function') {
            const btn = document.createElement('button');
            btn.className = 'toast-action';
            btn.textContent = opts.actionLabel;
            btn.onclick = () => { opts.onAction(); dismiss(); };
            toast.appendChild(btn);
        }
        container.appendChild(toast);

        const duration = opts.duration !== undefined ? opts.duration : (opts.actionLabel ? 7000 : 3500);
        if (duration > 0) timer = setTimeout(dismiss, duration);
        return dismiss;
    };

    // Sticky progress toast for network operations. Returns handles to update
    // the message and to resolve it as success or failure.
    //   const p = showProgress("Loading stations…");
    //   p.update("Fetching (server 2/3)…");
    //   p.done("142 stations loaded");   // or  p.fail("Overpass busy")
    window.showProgress = function(message) {
        const container = document.getElementById('toastContainer');
        if (!container) { console.log(`[progress] ${message}`); return { update(){}, done(){}, fail(){} }; }
        const toast = document.createElement('div');
        toast.className = 'toast info';
        const spinner = document.createElement('span');
        spinner.className = 'toast-spinner';
        const msg = document.createElement('span');
        msg.className = 'toast-msg';
        msg.textContent = message;
        toast.appendChild(spinner);
        toast.appendChild(msg);
        container.appendChild(toast);

        const remove = () => { toast.classList.add('hide'); setTimeout(() => toast.remove(), 200); };
        return {
            update(text) { msg.textContent = text; },
            done(text) {
                spinner.remove();
                toast.className = 'toast success';
                msg.textContent = text || 'Done';
                setTimeout(remove, 2500);
            },
            fail(text) {
                spinner.remove();
                toast.className = 'toast error';
                msg.textContent = text || 'Failed';
                setTimeout(remove, 4500);
            }
        };
    };

    // Small inline confirm modal. Returns a Promise<boolean>.
    window.showConfirm = function(message, opts = {}) {
        return new Promise(resolve => {
            const overlay = document.getElementById('appModalOverlay');
            const body = document.getElementById('appModalBody');
            const actions = document.getElementById('appModalActions');
            body.innerHTML = `<div>${message}</div>`;
            actions.innerHTML = '';

            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'app-modal-cancel';
            cancelBtn.textContent = opts.cancelLabel || 'Cancel';
            cancelBtn.style.flex = '1';

            const okBtn = document.createElement('button');
            okBtn.className = 'app-modal-confirm' + (opts.danger ? ' danger' : '');
            okBtn.textContent = opts.confirmLabel || 'Confirm';
            okBtn.style.flex = '1';

            const close = (val) => { overlay.classList.remove('open'); resolve(val); };
            cancelBtn.onclick = () => close(false);
            okBtn.onclick = () => close(true);
            actions.appendChild(cancelBtn);
            actions.appendChild(okBtn);
            overlay.classList.add('open');
            okBtn.focus();
        });
    };

    // Stacked-button chooser. `choices` is [{ value, label, hint? }]; resolves
    // with the chosen value, or null if cancelled. Used where a plain
    // confirm/prompt can't express more than two outcomes — e.g. picking which
    // way to supply a location when asking a question.
    window.showChoice = function(message, choices = [], opts = {}) {
        return new Promise(resolve => {
            const overlay = document.getElementById('appModalOverlay');
            const body = document.getElementById('appModalBody');
            const actions = document.getElementById('appModalActions');
            body.innerHTML = `<div>${message}</div>`;
            actions.innerHTML = '';

            const close = (val) => { overlay.classList.remove('open'); resolve(val); };

            const list = document.createElement('div');
            list.className = 'app-modal-choices';
            choices.forEach(choice => {
                const btn = document.createElement('button');
                btn.className = 'app-modal-choice';
                btn.innerHTML = choice.hint
                    ? `<span class="choice-label">${choice.label}</span><span class="choice-hint">${choice.hint}</span>`
                    : `<span class="choice-label">${choice.label}</span>`;
                btn.onclick = () => close(choice.value);
                list.appendChild(btn);
            });
            body.appendChild(list);

            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'app-modal-cancel';
            cancelBtn.textContent = opts.cancelLabel || 'Cancel';
            cancelBtn.style.flex = '1';
            cancelBtn.onclick = () => close(null);
            actions.appendChild(cancelBtn);

            overlay.classList.add('open');
        });
    };

    // Small inline prompt modal. Returns a Promise<string|null>.
    window.showPrompt = function(message, defaultValue = '', opts = {}) {
        return new Promise(resolve => {
            const overlay = document.getElementById('appModalOverlay');
            const body = document.getElementById('appModalBody');
            const actions = document.getElementById('appModalActions');
            body.innerHTML = `<div>${message}</div>`;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = defaultValue;
            body.appendChild(input);
            actions.innerHTML = '';

            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'app-modal-cancel';
            cancelBtn.textContent = 'Cancel';
            cancelBtn.style.flex = '1';

            const okBtn = document.createElement('button');
            okBtn.className = 'app-modal-confirm';
            okBtn.textContent = opts.confirmLabel || 'OK';
            okBtn.style.flex = '1';

            const close = (val) => { overlay.classList.remove('open'); resolve(val); };
            cancelBtn.onclick = () => close(null);
            okBtn.onclick = () => close(input.value);
            input.onkeydown = (e) => { if (e.key === 'Enter') close(input.value); };
            actions.appendChild(cancelBtn);
            actions.appendChild(okBtn);
            overlay.classList.add('open');
            setTimeout(() => { input.focus(); input.select(); }, 50);
        });
    };
}

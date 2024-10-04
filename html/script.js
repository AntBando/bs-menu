class BSMenu {
    constructor() {
        this.container = document.getElementById('bs-menu');
        this.itemsContainer = document.getElementById('menu-items');
        this.titleElement = document.getElementById('menu-title');
        this.menuItemTemplate = document.getElementById('menu-item-template');
    }

    openMenu(items) {
        this.itemsContainer.innerHTML = '';
        this.titleElement.textContent = items[0].header;

        items.slice(1).forEach(item => {
            this.addMenuItem(item);
        });

        this.container.style.display = 'block';
    }

    closeMenu() {
        this.container.style.display = 'none';
        fetch(`https://${GetParentResourceName()}/closeMenu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({})
        });
    }

    addMenuItem(item) {
        const menuItem = this.menuItemTemplate.content.cloneNode(true);
        const itemElement = menuItem.querySelector('.menu-item');
        
        itemElement.querySelector('.item-header').textContent = item.header;
        itemElement.querySelector('.item-description').textContent = item.txt || '';

        if (item.icon) {
            const iconElement = itemElement.querySelector('.item-icon');
            iconElement.className = `item-icon ${item.icon}`;
        }

        if (!item.isMenuHeader) {
            itemElement.addEventListener('click', () => {
                if (item.params && item.params.event) {
                    this.triggerEvent(item.params.event, item.params.args);
                }
                this.closeMenu();
            });
        }

        this.itemsContainer.appendChild(menuItem);
    }

    triggerEvent(eventName, args) {
        fetch(`https://${GetParentResourceName()}/triggerEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                event: eventName,
                args: args
            })
        });
    }
}

const bsMenu = new BSMenu();

window.addEventListener('message', (event) => {
    const item = event.data;
    if (item.action === "OPEN_MENU") {
        bsMenu.openMenu(item.data);
    }
});

document.onkeyup = function (data) {
    if (data.which == 27) {
        bsMenu.closeMenu();
    }
};
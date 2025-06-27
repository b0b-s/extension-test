const utils = {
    elem_create: (elem_name) => {
        try {
            return document.createElement(elem_name.toString());
        } catch(err) {
            console.error("encountered an error creating an element at utils.elem_create: ", err);
            return false;
        }
    },
    elem_id: (elem) => {
        try {
            if (typeof elem === "string") {
                return document.getElementById(elem.toString());
            }
            else {
                return elem;
            }
        } catch(err) {
            console.error("encountered an error identifying an element at utils.elem_id: ", err);
            return false;
        }
    },
    elem_append: (parent, children) => {
        try {
            parent === "body" ? parent = document.body : parent = utils.elem_id(parent);
            if (Array.isArray(children)) {
                children.forEach(child => {
                    parent.appendChild(child);
                });
            }
            else {
                parent.appendChild(children);
            }
            return true;
        } catch(err) {
            console.error("encountered an error appending element(s) at utils.elem_append: ", err);
            return false;
        }
    },
    elem_remove: (elements) => {
        try {
            if (Array.isArray(elements)) {
                elements.forEach(element => {
                    element.remove();
                });
                return true;
            }
            else {
                elements.remove();
            }
        } catch(err) {
            console.error("encountered an error creating element(s) at utils.elem_remove: ", err);
            return false;
        }
    },
    elem_descendants: (root) => {
        const elements = this.elem_id(root);
        return elements ? Array.from(elements.querySelectorAll('*')) : [];
    }
};
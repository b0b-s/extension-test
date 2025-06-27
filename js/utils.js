const utils = {
  elem_create(elem_name) {
    try {
      return document.createElement(String(elem_name));
    } catch (err) {
      console.error("utils.elem_create error:", err);
      return null;
    }
  },

  elem_id(elem) {
    try {
      return typeof elem === "string" ? document.getElementById(elem) : elem;
    } catch (err) {
      console.error("utils.elem_id error:", err);
      return null;
    }
  },

  elem_append(parent, children) {
    try {
      parent = parent === "body" ? document.body : utils.elem_id(parent);
      if (!parent) throw new Error("parent not found");

      (Array.isArray(children) ? children : [children])
        .forEach(child => parent.appendChild(child));

      return true;
    } catch (err) {
      console.error("utils.elem_append error:", err);
      return false;
    }
  },

  elem_remove(elements) {
    try {
      (Array.isArray(elements) ? elements : [elements])
        .forEach(el => el?.remove?.());
      return true;
    } catch (err) {
      console.error("utils.elem_remove error:", err);
      return false;
    }
  },

  /** Return **all descendant Element nodes** of root (empty array if none). */
  elem_descendants(root) {
    const el = utils.elem_id(root);        // <-- direct reference, no arrow‑fn this
    return el ? Array.from(el.querySelectorAll("*")) : [];
  }
};

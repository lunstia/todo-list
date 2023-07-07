export default class Storage {
    static getProjects() {
        if (!window.localStorage.getItem("projects")) return [];

        return JSON.parse(window.localStorage.getItem("projects"));
    }

    static saveProjects(projects) {
        if (window.localStorage.getItem("projects")) window.localStorage.removeItem("projects");

        window.localStorage.setItem("projects", JSON.stringify(projects));
    }

    static isAvailable() {
        let storage;
        try {
            storage = window.localStorage;
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
}
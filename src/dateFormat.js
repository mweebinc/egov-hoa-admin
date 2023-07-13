function dateFormat(string) {
    const date = new Date(string);
    return date.toLocaleDateString("en-US", { dateStyle: "medium" });
}

export default dateFormat;

export function parseBrand(name, arr) {
    let obj = {}
    arr.forEach(el => {
        if (el.name === name) {
            obj = el
        }
    })
    const res = []
    function traverse(arr) {
        for (const el of arr) {
            if ('children' in el) {
                traverse(el.children)
            } else {
                res.push({name: el.view_name, query: el.full_eng_name})
            }
        }
    }
    traverse(obj.children)
    return res
}
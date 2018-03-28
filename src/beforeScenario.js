module.exports = event => {
    const url = browser.getUrl();
    event.tags.forEach(tag => {
        const arr = tag.name.split(':');
        // tag with colon
        if (arr[1]) {
            let isRemove = false;
            if (url.match(arr[1])) {
                // url match with tag should be removed
                isRemove = (arr[0]==='@__non_url');
            } else {
                // url not match with tag should be removed
                isRemove = (arr[0]==='@__url');
            }
            if (isRemove) {
                event.tags = [];
                event.name = '';
                event.steps = [];
            }
        }
    })
}

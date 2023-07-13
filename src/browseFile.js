import click from './click';
import createPromise from './createPromise';

/**
 * @param accept file type
 * @returns {Promise | Promise<unknown>}
 */
function browseFile(accept) {
    const p = createPromise();
    const input = document.createElement('input');
    input.type = "file";
    input.accept = accept;
    input.onchange = function (e) {
        const files = e.target.files;
        p.resolve(files);
    }
    setTimeout(function () {
        click(input);
    }, 0);
    return p;
}

export default browseFile;

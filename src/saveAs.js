import click from './click';

function saveAs(blob, name) {
    const a = document.createElement('a');
    name = name || blob.name || 'download';
    a.download = name;
    a.rel = 'noopener';
    // Support blobs
    a.href = URL.createObjectURL(blob)
    setTimeout(function () {
        URL.revokeObjectURL(a.href)
    }, 4E4) // 40s
    setTimeout(function () {
        click(a)
    }, 0)
}

export default saveAs;

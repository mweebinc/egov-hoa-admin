import Queue from 'nq';
const ENDPOINT = '/import'

class ImportUseCase {
    execute(file) {
        const options = {
            body: file,
            headers: {'Content-Type': 'application/octet-stream'}
        };
        return new Queue.Rest().request('POST', ENDPOINT,options);
    }
}

export default ImportUseCase;

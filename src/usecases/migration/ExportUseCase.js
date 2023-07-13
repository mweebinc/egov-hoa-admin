import Queue from 'nq';
const ENDPOINT = '/export'

class ExportUseCase {
    execute() {
        const options = {
            raw: true,
            headers: {'Content-Type': 'application/octet-stream'}
        };
        return new Queue.Rest().request('POST', ENDPOINT,options);
    }
}

export default ExportUseCase;

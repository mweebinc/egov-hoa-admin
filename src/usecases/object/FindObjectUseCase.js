import Queue from 'nq';

class FindObjectUseCase {
    execute(collection, query, options) {
        return new Queue.Document().find(collection, query, options);
    }
}

export default FindObjectUseCase;

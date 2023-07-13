import Queue from 'nq';

class GetObjectUseCase {
    execute(collection, id, options) {
        return new Queue.Document().get(collection, id, options);
    }
}

export default GetObjectUseCase;

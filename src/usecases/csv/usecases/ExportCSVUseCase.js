import Papa from 'papaparse';
import flatten from '../../../flatten';
import saveAs from '../../../saveAs';

const MIMEType = {type: "text/csv;chartset=utf-8"};

class ExportCSVUseCase {
    execute(objects, filename) {
        return new Promise((resolve, reject) => {
            try {
                const flat = objects.reduce((acc, cur) => {
                    acc.push(...flatten(cur));
                    return acc;
                }, []);
                const data = Papa.unparse(flat);
                const blob = new Blob([data], MIMEType);
                saveAs(blob, filename);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default ExportCSVUseCase;

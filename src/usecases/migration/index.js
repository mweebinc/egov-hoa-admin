import ExportUseCase from './ExportUseCase';
import ImportUseCase from './ImportUseCase';


export function exportUseCase() {
    return new ExportUseCase();
}

export function importUseCase() {
    return new ImportUseCase();
}

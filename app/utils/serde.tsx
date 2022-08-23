
export function text2bool (text: string) {
    if(text === 'true' || text === '1' || text === 'on') {
        return true;
    }
    return false;
}
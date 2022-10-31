export async function getAllBooks() {

    try {
        const response = await fetch('/books');
        return await response.json();
    } catch (error) {
        return [];
    }
}

module.exports = async function () {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const pages = await response.json();
    return pages.map(page => ({
        id: page.id,
        url: `https://jsonplaceholder.typicode.com/posts/${page.id}`,
        title: page.title,
        userId: page.userId,
        meta: page.userId,
        data: page.body,
    }));
};

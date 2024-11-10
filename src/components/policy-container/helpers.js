export const OpenLink = (link, setWebViewUrl, setWebViewModal) => {
    setWebViewUrl(link);
    setWebViewModal(true);
};
export const CloseModal = (setWebViewModal) => {
    setWebViewModal(false)
}
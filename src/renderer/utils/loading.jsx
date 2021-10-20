  const showLoading = function() {
    const loading = document.getElementById("loading");
    if (loading) {
      loading.classList.add("shown");
    }
    const layout = document.getElementById("layout");

    if (layout) layout.style.opacity = "0.6";
  };
  const hideLoading = function() {
    const loading = document.getElementById("loading");
    if (loading) {
      loading.classList.remove("shown");
    }
    const layout = document.getElementById("layout");

    if (layout) layout.style.opacity = "1";
  }


export {
  showLoading,
  hideLoading,
}

export default {
  showLoading: showLoading,
  hideLoading: hideLoading
};

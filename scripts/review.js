function load() {
    const submissions = localStorage.getItem("submissions");

    let count = 0;
    console.log(submissions);

    if(submissions) {
        count = parseInt(submissions);
        count++;
        localStorage.setItem("submissions", count);
    } else {
        localStorage.setItem("submissions", "0");
    }

    document.getElementById("review-number").textContent = count;
}

load();

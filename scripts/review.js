function load() {
    const submissions = localStorage.getItem("submissions");

    let count = 1;
    console.log(submissions);

    if(submissions) {
        count = parseInt(submissions);
        count++;
        localStorage.setItem("submissions", count);
    } else {
        localStorage.setItem("submissions", "1");
    }

    document.getElementById("review-number").textContent = count;
}

load();

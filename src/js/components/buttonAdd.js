const onClick = () => {
  const mainSelect = document.querySelector('.main__homePage')
  const div = document.createElement("div");
  div.classList.add("header-btn-container");


  const buttonFirst = document.createElement("div");
  buttonFirst.classList.add("header-big-btn header-btn-hover");
  buttonFirst.textContent = 'Watched';
  buttonFirst.href = "#";



  const buttonNext = document.createElement("div");
  buttonNext.classList.add("header-big-btn header-btn-hover");
  buttonNext.textContent = 'Queue';
  buttonNext.href = "#";


  div.append(buttonFirst, buttonNext);

  mainSelect.insertAdjacentElement("beforeend", div);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [] };

  }

   
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    
    window.addEventListener(
    "beforeunload",
    this.saveStateToLocalStorage.bind(this));

  }

  componentWillUnmount() {
    window.removeEventListener(
    "beforeunload",
    this.saveStateToLocalStorage.bind(this));


    
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice() };

    const list = [...this.state.list];
    list.push(newItem);

    this.setState({
      list,
      newItem: "" });

  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  render() {
    return (
      React.createElement("div", null, 

      React.createElement("h1", { className: "app-title" }, "MY LIST"), 

      React.createElement("div", { className: "container" }, 
      React.createElement("div", {
        style: {
          padding: 30,
          textAlign: "left",
          maxWidth: 500,
          margin: "auto",
          color: "rgb(148, 68, 107)" } }, "Add an Item...", 



      React.createElement("br", null), 
      React.createElement("input", {
        type: "text",
        placeholder: "Type item here",
        value: this.state.newItem,
        onChange: e => this.updateInput("newItem", e.target.value) }), 

      React.createElement("button", {
        className: "add-btn btn-floating",
        onClick: () => this.addItem(),
        disabled: !this.state.newItem.length }, 

      React.createElement("i", { class: "material-icons" }, " + ")),

      React.createElement("br", null), " ", React.createElement("br", null), 
      React.createElement("ul", null,
      this.state.list.map(item => {
        return (
          React.createElement("li" , { key: item.id },
          item.value, 
          React.createElement("button", { className: "btn btn-floating", onClick: () => this.deleteItem(item.id) },
          React.createElement("i", { class: "material-icons" }, "x"))));



      }))))));





  }}




ReactDOM.render( React.createElement(App, null), document.getElementById('root'));
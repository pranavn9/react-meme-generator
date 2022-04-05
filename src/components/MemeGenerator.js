import React from "react";
import { toPng } from 'html-to-image';

class MemeGenerator extends React.Component {
    constructor(){
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            randomImageAltText: "",
            allMemeImgs: []
        }
        this.myRef = React.createRef();
        this.downloadMeme = this.downloadMeme.bind(this);
    }
    
    handleChange = (event) =>{
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }

    generateRandom = (event) => {
        event.preventDefault();
        const random = Math.floor(Math.random() * this.state.allMemeImgs.length);
        const randomMeme = this.state.allMemeImgs[random];
        this.setState({
            randomImage: randomMeme.url,
            randomImageAltText: randomMeme.name
        })
    }

    downloadMeme = (event) => {
        event.preventDefault();
        toPng(this.myRef.current, { cacheBust: true, })
        .then((dataUrl) => {
            const link = document.createElement('a');
            // The file name can be made more dynamic based on your use-case
            link.download = 'my-meme.png';
            link.href = dataUrl;
            link.click();
            this.setState({
                topText: "",
                bottomText: ""
            })            
        })
        .catch((err) => {
            console.log(err);
        })
    };

    componentDidMount() {
        const url = "https://api.imgflip.com/get_memes";
        fetch(url)
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data;
            this.setState({
                allMemeImgs : memes
            })
            
        })
    }

    render(){
        return (
            <div className="app-content">
                <div className="meme" ref={this.myRef}>
                    <img src={this.state.randomImage} alt={this.state.randomImageAltText}/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
                <form>
                    <span className="left">
                        <input autoComplete="off" type="text" placeholder="Enter Top Text" name="topText" value={this.state.topText} onChange={this.handleChange}/>
                        <br/>
                        <input autoComplete="off" type="text" placeholder="Enter Bottom Text" name="bottomText" value={this.state.bottomText} onChange={this.handleChange}/>
                    </span>
                    <span className="app-buttons">
                        <button className="btn-grad-download btn-grad" onClick={this.downloadMeme}>Download</button>
                        <button className="btn-grad-shuffle btn-grad" onClick={this.generateRandom}>Shuffle</button>
                    </span>
                </form>  
                              
            </div>
        )
    }
}

export default MemeGenerator;

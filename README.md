<link href="https://fonts.googleapis.com/css?family=Comfortaa|Permanent+Marker&display=swap" rel="stylesheet">

<h1 align="center" style="font-family: 'Permanent Marker', cursive; color: #03324c">FROM REACT TO THE STARS</h1><br/>

<img align="center" src="https://i.imgur.com/rNS9Le9.jpg" width=100%>

<h2 align="center" style="font-family: 'Comfortaa'; color: #ffa700">Memory 2.0</h2>
<h5 align="center" style="font-family: 'Comfortaa'; color: #152740; font-style: italic">"It was going to be a lonely trip back."</h5>

## Description

The repository will get you through your React self-learning.

Following a few steps, you will have to reproduce the world most famous game: **Optisantis Memory**

<div align="center">
<img src="https://i.imgur.com/LZprpWU.png" width=66% >
</div>

To achieve this goal, you will have to respect a few rules:

- **You cannot watch, read, inspect or copy original sources from _webviews_caa_**
- **You cannot copy other sources**

  > 🚨 Be careful, we'll know it

- For each step, create a branch _(refer to the branch name in the step)_, commit your work for each new _feature_, and push it when you think it is done.

But, you can, and it is recommended to:

- **Ask your mates for advices, tips, ...**
- **Read documentation and watch how other developers do on codebase websites**

> Your favorites documentation websites: [React](https://fr.reactjs.org/), [Typescript](https://www.typescriptlang.org/), [Mozilla Developer Docs](https://developer.mozilla.org/fr/docs/Web/JavaScript) and [StackOverFlow](https://stackoverflow.com/)

Implement a simple style logic, but do not focus on it.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Steps

###### For each step, create a branch from `master`.

#### 0. Connect ReactDOM

Render a basic `<h1>hello world</h1>` from React in your browser.

#### 1. Pass props

> _Git branch:_ **sprint1/pass-props**

> _Estimed time:_ **40mn**

Create a component (like just below). This component is named `CardButton`<br />
and should receive the number _(12, here)_ as **_prop_**.

<img src="https://i.imgur.com/JcgteeH.png">

#### 2. Mix components

> _Git branch:_ **sprint2/render-with-react**

> _Estimed time:_ **1h**

In this step, you will have to render the component like below.<br />
This component is named `SelectLevelContainer` and embeds 5 `CardButton` components.

<img src="https://i.imgur.com/GO96dab.png" >

> React.js offers multiples ways to render components in virtual **DOM** _(what is DOM?)_.
>
> - React Class Component
> - React Functionnal Component

> Will you use a class or a function to render your components?

> Will you write `<CardButton/>` 5 times ? **Iteration** is the key 💡

#### 3. Share a state

> _Git branch:_ **sprint3/share-state**

> _Estimed time:_ **1h30**

For this step, you have to create two separate components<br />
that share the number of displayed card as state.

<img src="https://i.imgur.com/xRVK6US.png" width=77%/>
<img src="https://i.imgur.com/DtbnFgg.png" width=77%/>

> How can you deal with state, state mutation, state exporting, ... ? [Hooks?](https://fr.reactjs.org/docs/hooks-state.html)

> You can reuse the previous component.

#### 4. Read this -> https://fr.reactjs.org/docs/thinking-in-react.html

_(but you already knew that, isn't it)_

#### 5. Implement a game logic

> _Git branch:_ **sprint4/game-logic**

> _Estimed time:_ **4h**

React is powerfull to generate nice user interface.<br />And why not a game logic?

Implement a timer that starts on the first card reveal (oh, yes,<br />cards have an image on the back, did you know?).<br />
Implement a click counter too, and a _Scoring Board_ when the user finish the game.

<img src="https://i.imgur.com/URM5O8y.png"/>

#### 6. Crossing states

> _Git branch:_ **sprint5/crossing-states**

> _Estimed time:_ **3h**

This step wants you to add a theme manager.<br />
5 themes to manage is not an easy thing to do.<br />
Make the change as smooth as possible for the user, as clean as possible for developers. Good luck!

<img src="https://i.imgur.com/u79BqLM.png">

#### 7. Record board

> _Git branch:_ **sprint6/record-board**

> _Estimed time:_ **4h**

Create a highest achievement manager in your game.<br />
Users should be able to do chrono record and click record.

<img src="https://i.imgur.com/OlXc7Ae.png"/>

# REACT

### What is React?

- React is a JavaScript library (by Meta) for building user interfaces, especially single-page applications (SPAs).
- It lets us build the UI from small, reusable pieces called components.
- It is a library, not a full framework: it handles only the UI (view layer). Routing, state management, API calls etc. use separate libraries (React Router, Redux/Zustand, Axios...).

### Why do we need React?

- Problem with plain JS: we must manually update the DOM every time the data changes. In large apps this gets complex and buggy.
- React solves this:
    - Declarative: we describe WHAT the UI should look like for the current data; React handles HOW to update the DOM.
    - Component-based: UI is split into reusable components (Button, Navbar, Card), making code easier to manage and reuse.
    - Efficient updates (Virtual DOM): React keeps a lightweight copy of the DOM in memory, compares the old and new versions (diffing), and updates only the parts of the real DOM that changed.
    - One-way data flow: data flows from parent to child via props, making the app predictable and easier to debug.
    - Large ecosystem and community: many libraries, tools and jobs.
    - Can also build mobile apps with React Native.

### Example

```jsx
import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <button onClick={() => setCount(count + 1)}>
            Clicked {count} times
        </button>
    );
}
```

- When setCount runs, React re-renders the component and updates only the changed text in the DOM.

### What is VITE?

- Vite is a build tool that provides a fast development environemnt for modern web projects.
- Created by Evan You (Vue.js creator).
- It has two main jobs
    - Dev ser : runs the app locally with HMR (Hot Module Replacement) for fast updates.
    - Build : bundles the app for production (minification, tree-shaking, etc.).
- Vite is faster than older tools (Webpack, Parcel) because it uses native ES modules

### Why we need build tools?

- Browsers cant directly run JSX, Typescript, Vue SFCs or other modern JS features.
- A build tool converts our code into plain HTML/CSS/JS that browsers can understand and optimizes it for production(minification, tree-shaking, etc.).

### JSX

- JSX (JavaScript XML) is a syntax extension for JavaScript that looks like HTML.
- It lets us write HTML-like code inside JavaScript files.
- Example:

```jsx
const element = <h1>Hello, world!</h1>;
```

### Why can't we write HTML directly in React?

- React components are JavaScript functions, and a .js/.jsx file is JavaScript, not HTML.
- Plain JavaScript doesn't understand HTML tags. This is a syntax error in pure JS:

```js
const element = <h1>Hello</h1>; // ❌ invalid JavaScript
```

- So React needs a way to describe UI using JavaScript. That way is:
    - React.createElement() (plain JS, no JSX), or
    - JSX (HTML-like syntax that gets converted into those function calls)

### What JSX actually becomes

- The browser can't run JSX either. A build tool (Vite) converts it into plain JS before it reaches the browser.

```jsx
// What we write (JSX)
const element = <h1 className="title">Hello, {name}</h1>;

// What it compiles to (plain JS)
const element = React.createElement('h1', { className: 'title' }, 'Hello, ', name);
// (React 17+ uses jsx() from 'react/jsx-runtime' instead, but the idea is the same)

// What that returns: a plain JS object describing the UI (a React element)
{ type: 'h1', props: { className: 'title', children: ['Hello, ', 'Sakthi'] } }
```

- React reads these objects (the Virtual DOM) and creates or updates the real DOM.

### React without JSX

- JSX is optional. We can write React using createElement directly:

```js
// Without JSX
React.createElement(
    "div",
    { className: "card" },
    React.createElement("h2", null, "Sakthi"),
    React.createElement("p", null, "Vue Developer"),
);

// With JSX: same result, much easier to read
<div className="card">
    <h2>Sakthi</h2>
    <p>Vue Developer</p>
</div>;
```

- For nested UI, createElement quickly becomes hard to read and write. That's why JSX is used.

### Why not just use HTML strings?

```js
container.innerHTML = `<h1>Hello ${name}</h1>`; // the old way
```

- Security: inserting user data into HTML strings allows XSS attacks. JSX escapes values automatically.
- No components: strings can't contain reusable components like <UserCard />.
- No efficient updates: changing a string means rebuilding that HTML; React can't diff it.
- No error checking: typos in strings are found only at runtime. JSX errors are caught at build time.

### Why JSX? (benefits)

- Readable: looks like HTML, so the UI structure is easy to see.
- Full JavaScript power: use variables, functions, .map(), conditions directly inside the UI with { }.
- UI and logic together in one component.
- Safe: values inside { } are escaped automatically (prevents XSS).
- Errors caught at compile time.

### How Vue handles it

- Vue uses an HTML-based template inside .vue files:

```vue
<template>
    <h1 :class="cls">Hello, {{ name }}</h1>
    <li v-for="u in users" :key="u.id">{{ u.name }}</li>
</template>
```

- The Vue compiler converts the template into a render function using h() (similar to React.createElement):

```js
h("h1", { class: cls }, "Hello, " + name);
```

- So both end up as JavaScript functions that create a Virtual DOM. The difference is only in what we write:
    - React → JSX: JavaScript with HTML-like syntax. Logic uses plain JS (.map, &&, ternary).
    - Vue → Templates: HTML with special directives (v-if, v-for, v-model, :bind, @event).
- Vue also supports JSX optionally, but templates are the default.

### React vs Vue syntax

- Output text: React {name} | Vue {{ name }}
- Attribute: React className={cls} | Vue :class="cls"
- Event: React onClick={fn} | Vue @click="fn"
- Condition: React {isLoggedIn && <Nav />} | Vue <Nav v-if="isLoggedIn" />
- Loop: React {users.map(u => <li key={u.id}>{u.name}</li>)} | Vue <li v-for="u in users" :key="u.id">
- Two-way bind: React value={v} onChange={...} | Vue v-model="v"

### JSX rules

- Return one root element (wrap in <div> or a fragment <> </>).
- Use className instead of class, htmlFor instead of for.
- Attributes and events in camelCase: onClick, tabIndex.
- JavaScript expressions go inside { }: {name}, {2 + 2}, {user.age > 18 ? 'Adult' : 'Minor'}
- Only expressions inside { }, not statements (no if/for directly; use ternary/&&/.map).
- Self-close empty tags: <img />, <input />, <br />.
- Inline styles use an object: style={{ color: 'red', fontSize: '16px' }}
- Component names must start with a capital letter: <UserCard /> (lowercase = HTML tag).

### Components

- Components are the building blocks of a React app.
- A component is a function (or class) that returns JSX (HTML-like syntax).
- Components can be:
    - Functional components: simple functions that return JSX.
    - Class components: ES6 classes that extend React.Component and have a render method (less common now).
- Components can have:
    - Props: inputs passed from parent to child.
    - State: internal data that can change over time (using useState hook).
- Example of a functional component with props and state:

    ```jsx
    import { useState } from "react";
    function Greeting({ name }) {
        const [count, setCount] = useState(0);
        return (
            <div>
                <h1>Hello, {name}!</h1>
                <button onClick={() => setCount(count + 1)}>
                    Clicked {count} times
                </button>
            </div>
        );
    }
    ```

    - Here, `name` is a prop passed from the parent, and `count` is a state variable that updates when the button is clicked.

## REACT ROUTER

### What is React Router?

- React Router is a library for handling routing in React applications.
- It lets us build single-page applications (SPAs) with multiple pages/views without reloading the page.
- It maps URLs to components: /home → Home component, /about → About component.
- It uses the HTML5 History API to change the URL and browser history without a full page reload.
- Install (v7): `npm i react-router`
    - In v7, react-router-dom is merged into react-router (react-router-dom still works as a re-export).

### Main components and hooks

- <BrowserRouter> → wraps the app and enables routing
- <Routes> → container for all routes; renders the first matching one (replaced <Switch> from v5)
- <Route path="" element={} /> → maps a URL path to a component
- <Link to=""> → navigation without page reload (use instead of <a href>)
- <NavLink> → like Link, but adds an "active" class when its route is active (for menus)
- <Outlet /> → placeholder where child routes render (nested routes)
- useParams() → reads dynamic URL params (/users/:id)
- useNavigate() → navigate from code (e.g. after login)

### Basic example

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router";

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />{" "}
                {/* 404: matches any unknown path */}
            </Routes>
        </BrowserRouter>
    );
}
```

### Why <Link> instead of <a>?

- <a href="/about"> → full page reload; React state is lost.
- <Link to="/about"> → only the component changes; no reload, state is kept.

### Nested routes and <Outlet />

- Used for layouts: a common Navbar/Footer with changing content inside.

```jsx
<Routes>
    <Route path="/" element={<Layout />}>
        <Route index element={<Feed />} /> {/* "/" */}
        <Route path="login" element={<Login />} /> {/* "/login" */}
        <Route path="profile" element={<Profile />} />
    </Route>
</Routes>;

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet /> {/* child route renders here */}
            <Footer />
        </>
    );
}
```

- `index` route = the default child shown at the parent's path.

### Dynamic params: useParams()

```jsx
<Route path="/users/:id" element={<UserDetail />} />;

function UserDetail() {
    const { id } = useParams(); // /users/42 → id = '42'
    return <h1>User {id}</h1>;
}
```

### Programmatic navigation: useNavigate()

```jsx
function Login() {
    const navigate = useNavigate();

    const handleLogin = async () => {
        // ...login API call...
        navigate("/"); // go to home
        // navigate(-1);                   // go back
        // navigate('/login', { replace: true }); // replace history (back button won't return)
    };

    return <button onClick={handleLogin}>Login</button>;
}
```

# REACT HOOKS

- Hooks are special functions (starting with "use") that let functional components use React features like state, side effects and context.
- Similar to Vue's Composition API (ref, onMounted, watch, inject).

### useState: remember a value

- Stores a value across renders; calling the setter updates the value and re-renders the component.
- A normal variable resets on every render and doesn't update the screen.

```jsx
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>{count}</button>;
```

### useEffect: run code after render (side effects)

- Used for API calls, timers, subscriptions.
- Dependency array controls when it runs:
    - [] → once after first render (like onMounted)
    - [value] → on first render and whenever value changes (like watch)
    - none → after every render
- Returning a function = cleanup (like onUnmounted)

```jsx
useEffect(() => {
    const timer = setInterval(() => console.log("tick"), 1000);
    return () => clearInterval(timer);
}, []);
```

### useContext: share data without passing props

- Avoids prop drilling (passing props through many levels).

```jsx
const UserContext = createContext();
<UserContext.Provider value={user}>
    <App />
</UserContext.Provider>;
const user = useContext(UserContext); // in any child
```

### useReducer: complex state logic

- Like useState, but all update logic is in one reducer function; updates happen via dispatch(action).
- Use when state has many related values or many types of updates.

```jsx
function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "reset":
            return { count: 0 };
    }
}
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: "increment" });
```

### useRef: persist values without re-render / access DOM

- Value is stored in ref.current and survives re-renders.
- Changing it does NOT re-render.
- Used for DOM access (focus input), timers, previous values.

```jsx
const inputRef = useRef(null);
<input ref={inputRef} />;
inputRef.current.focus();
```

### Rules of hooks

- Call hooks only at the top level of a component (not inside if, loops or nested functions); React tracks hooks by call order.
- Call hooks only inside React components or custom hooks.
- Custom hook names must start with "use".

# REDUX

### What is Redux?

- Redux is a state management library: it keeps shared data in one central place (the store).
- Any component can read or update that data directly, without passing props through every level (avoids prop drilling).
- Redux Toolkit (RTK) is the official, simpler way to write Redux.
- Similar to Pinia/Vuex in Vue.

### Core concepts

- Store → one central object holding all shared state
- Slice → one section of the store for one feature (user, feed, connections)
- State → current data inside a slice
- Action → an object describing what happened: { type: 'user/addUser', payload: data }
- Reducer → function that updates the state based on the action
- Dispatch → sending an action to the store: dispatch(addUser(data))
- Selector → reading data from the store: useSelector(store => store.user)

### Data flow (one direction)

- Component dispatches an action → reducer updates the state → components using that state re-render automatically.

### Setup

- Install: `npm install @reduxjs/toolkit react-redux`

1. Create a slice

```js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => action.payload,
        removeUser: () => null,
    },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
```

2. Create the store

```js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const appStore = configureStore({
    reducer: { user: userReducer },
});

export default appStore;
```

3. Provide the store to the app

```jsx
import { Provider } from "react-redux";
<Provider store={appStore}>
    <App />
</Provider>;
```

4. Write (dispatch)

```jsx
const dispatch = useDispatch();
dispatch(addUser(res.data.data));
```

5. Read (select)

```jsx
const user = useSelector((store) => store.user);
```

### Reducer rules

- RTK uses Immer, so we can "mutate" state directly: state.push(item), state.name = 'x' (don't return).
- Or return a new value: return action.payload.
- Never mutate and return in the same reducer.
- If initialState is null or a primitive, we must return the new value.

### Good practices

- Select only what you need: useSelector(store => store.user), not the whole store.
- Use Redux only for shared data (user, feed, cart); use useState for local UI state (inputs, toggles).
- Redux state is lost on page refresh; re-fetch the data on app load and dispatch it again.
- Redux DevTools browser extension shows every action and state change (configureStore enables it automatically).

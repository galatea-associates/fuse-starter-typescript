import App from "./App";
import {shallow} from "enzyme";

describe('App', () => {
    it ('can be shallow rendered', () => {
        shallow(App()
        )
    })
})
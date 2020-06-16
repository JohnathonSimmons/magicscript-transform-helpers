import { LandscapeApp, ui } from 'lumin';
import { transform } from './transform/transform.js'
import { curves } from './transform/curves.js'
import { setRotationDeg, getRotationDeg } from './helpers.js'

const { UiText, UiButton, EclipseLabelType, Alignment, HorizontalTextAlignment, UiDropDownList, DropDownListItem, UiLinearLayout } = ui;



export class App extends LandscapeApp {
  onAppStart () {

    // Create a new prism that's half a meter cubed.
    let prism = this.requestNewPrism([1, 0.5, 0.5])


    let transformDuration = 300
    let endX = -.1
    let endY = -.25
    let endZ = .2
    let transformEndValue = [endX,endY,endZ]

    // an end value for rotation needs to be provided in Quaternions

    let transformCurve = 'easeInOutExpo'
    let transformDelay = 0


    let transformList = []
    let selectedTransform


    // Create a nice text label using UIKit.
    let text = UiText.CreateEclipseLabel(
      prism,
      'Transform Me',
      EclipseLabelType.kT7
    );
    text.setAlignment(Alignment.CENTER_CENTER)
    text.setTextAlignment(HorizontalTextAlignment.kCenter)
    let textReset = function(){
      text.setLocalPosition([0,0,0])
      text.setLocalScale([1,1,1])
      let initialRotation = setRotationDeg(0,45,0)
      text.setLocalRotation(initialRotation)
    }
    textReset()


    let textRotation = text.getLocalRotation()



    // Create a button to trigger the transform
    let button = UiButton.Create(prism, 'Transition')
    button.setLocalPosition([0,-.1,0])
    button.onActivateSub(uiEventData => {
      // Transforming out of the prism bounds will clip your content
      transform[selectedTransform](text, transformDuration, transformEndValue, transformCurve, transformDelay)
      reset.setVisible(true)


    })

    // Create a button to reset the transform.
    let reset = UiButton.Create(prism, 'Reset')
    reset.setLocalPosition([0,-.16,0])
    reset.setVisible(false)
    reset.onActivateSub(uiEventData => {
      textReset()
      transform.translateY(reset, 200, -.16, 'easeInOutExpo')
      reset.setVisible(false)
    })

    let controlBar = UiLinearLayout.Create(prism)
    controlBar.setLocalPosition([-.32,.16,0])

    // Build the available list of transitions
    let translateList = []
    let scaleList = []
    let rotateList = []

    for (var key in transform){
      let keyIndex = Object.keys(transform).indexOf(key) + transformList.length
      let listItem = new DropDownListItem(key.toString(), keyIndex)
      if(key.includes('translate')){
        translateList.push(listItem)
      }
      if(key.includes('scale')){
        scaleList.push(listItem)
      }
      if(key.includes('rotate')){
        rotateList.push(listItem)
      }
    }

    let translateListItem = new DropDownListItem('Translate', translateList, 0)
    let scaleListItem = new DropDownListItem('Scale', scaleList, 1)
    let rotateListItem = new DropDownListItem('Rotate', rotateList, 2)

    transformList = [translateListItem, scaleListItem, rotateListItem]

    // Create a drop down to select the transformation from
    let transformSelector = UiDropDownList.Create(prism, 'transforms')
    transformSelector.setList(transformList)
    transformSelector.setAlignment(Alignment.CENTER_LEFT)

    let endDefinition = UiLinearLayout.Create(prism)
    //endDefinition.setOrientation(Orientation.kHorizontal)


    // When the dropdown closes:
        // reset the animating node
        // turn off the reset button
        // set the newly selected transform
        // update the dropdown label to the selected item
    transformSelector.onFocusLostSub(uiEventData => {
      textReset()
      reset.setVisible(false)
      selectedTransform = transformSelector.getSelectedItems()[0].label
      transformSelector.setText(selectedTransform)
      if (selectedTransform === 'translate' || selectedTransform === 'scale' || selectedTransform === 'rotate') {
        console.log(3)
        transformEndValue = [-.1,-.25,.2]
      } else {
        console.log(1)
        transformEndValue = -.25
      }
    })

    // Selects the first transition on load
    //transformSelector.setSelected(1, true)
    transformList[0].subItems[0].setSelected(true)
    //selectedTransform = transformSelector.getList()[0].label
    selectedTransform = transformList[0].subItems[0].label
    transformSelector.setText(selectedTransform)





    // TODO: Allow the user to select a curve to apply

    // let curveList = []
    //
    // for (var key in curves){
    //   let keyIndex = Object.keys(curves).indexOf(key)
    //   let listItem = new DropDownListItem(key.toString(), keyIndex)
    //   curveList.push(listItem)
    // }
    //
    //
    // let curveSelector = UiDropDownList.Create(prism, 'curves')
    // curveSelector.setList(curveList)


    controlBar.addItemAt(0,transformSelector, [0,0,.02,0], Alignment.CENTER_LEFT)
    //controlBar.addItemAt(1,curveSelector, [0,0,.02,0], Alignment.CENTER_LEFT)

    // Attach the ui elements to the root of the prism's scene graph.
    prism.getRootNode().addChild(text)
    prism.getRootNode().addChild(button)
    prism.getRootNode().addChild(reset)
    prism.getRootNode().addChild(controlBar)
    //prism.getRootNode().addChild(transformSelector)
    //prism.getRootNode().addChild(curveSelector)
  }
}

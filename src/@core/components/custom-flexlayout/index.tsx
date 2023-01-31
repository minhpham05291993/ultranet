//  https://github.com/caplin/FlexLayout/blob/master/examples/demo/App.tsx

import { BorderNode, IJsonModel, ITabSetRenderValues, Layout, Model, TabNode, TabSetNode } from 'flexlayout-react'
import 'flexlayout-react/style/light.css'
import React, { RefObject, createRef } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import CustomFlexLayoutSetting from './CustomFlexLayoutSetting'

interface IProps {
  layoutName: string
  defaultJson: IJsonModel
  componentObj: any
}

function FlexLayout({ layoutName, defaultJson, componentObj }: IProps) {
  // const [layoutFile, setLayoutFile] = React.useState(null);
  // const [model, setModel] = React.useState(null);
  // const [adding, setAdding] = React.useState(false);
  // const [fontSize, setFontSize] = React.useState('medium');
  // const [realtimeResize, setRealtimeResize] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const savedLayout = localStorage.getItem(layoutName)
  let json = defaultJson

  if (savedLayout) {
    json = JSON.parse(savedLayout)
  }
  const model = Model.fromJson(json)
  if (!model) return null
  const layoutRef: RefObject<Layout> = createRef()

  const handleClickMenu = (key: string, node: TabSetNode | BorderNode) => {
    onAddFromTabSetButton(node, key)
    setAnchorEl(null)
  }

  const factory = (node: TabNode) => {
    const component: any = node.getComponent()

    return componentObj[component]
  }

  const onRenderTabSet = (node: TabSetNode | BorderNode, renderValues: ITabSetRenderValues) => {
    console.log('onRenderTabSet', node.getId())
    const menu = (
      <div>
        <IconButton size='small' onClick={handleClick} color='primary' aria-label='add to layout'>
          <AddIcon />
        </IconButton>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          {Object.values(componentObj).map((component, index) => {
            return (
              <MenuItem
                onClick={() => handleClickMenu(Object.keys(componentObj)[index], node)}
                key={Object.keys(componentObj)[index]}
              >
                {Object.keys(componentObj)[index]}
              </MenuItem>
            )
          })}
        </Menu>
      </div>
    )

    renderValues.stickyButtons.push(menu)
  }

  const onAddFromTabSetButton = (node: TabSetNode | BorderNode, componentName?: string) => {
    console.log('onAddFromTabSetButton', node.getId(), layoutRef.current)
    layoutRef.current!.addTabToTabSet(node.getId(), {
      component: componentName,
      name: componentName

      // enableClose: true,
    })
  }

  const handleChangeLayout = () => {
    localStorage.removeItem(layoutName)
    window.location.reload()
  }

  const handleOnModelChange = (data: any) => {
    localStorage.removeItem(layoutName)
    localStorage.setItem(layoutName, JSON.stringify(data.toJson()))
  }

  // const handleSelectLayout = (value: string) => {
  //   loadLayout(value)
  // }

  // const loadLayout = (layoutName: string, reload?: boolean) => {
  // if (this.state.layoutFile !== null) {
  //     this.save();
  // }
  // this.loadingLayoutName = layoutName;
  // let loaded = false;
  // if (!reload) {
  //     var json = localStorage.getItem(layoutName);
  //     if (json != null) {
  //         this.load(json);
  //         loaded = true;
  //     }
  // }
  // if (!loaded) {
  //     Utils.downloadFile("layouts/" + layoutName + ".layout", this.load, this.error);
  // }
  // }

  return (
    <div style={{ flexDirection: 'column', position: 'relative', display: 'flex', height: '100%', width: '100%' }}>
      <CustomFlexLayoutSetting onChangeLayout={handleChangeLayout} />
      <div className='flex-1 relative'>
        <Layout
          model={model}
          factory={factory}
          onRenderTabSet={onRenderTabSet}
          onModelChange={handleOnModelChange}
          ref={layoutRef}

          // font={{ size: this.state.fontSize }}
          // onAction={this.onAction}
          // titleFactory={this.titleFactory}
          // iconFactory={this.iconFactory}
          // onRenderTab={this.onRenderTab}
          // onAction={handleOnAction}
          // onRenderDragRect={this.onRenderDragRect}
          // onRenderFloatingTabPlaceholder={this.state.layoutFile === "newfeatures" ? this.onRenderFloatingTabPlaceholder : undefined}
          // onExternalDrag={this.onExternalDrag}
          // realtimeResize={this.state.realtimeResize}
          // onTabDrag={this.state.layoutFile === "newfeatures" ? this.onTabDrag : undefined}
          // onContextMenu={this.state.layoutFile === "newfeatures" ? this.onContextMenu : undefined}
          // onAuxMouseClick={this.state.layoutFile === "newfeatures" ? this.onAuxMouseClick : undefined}
          // onTabSetPlaceHolder={this.onTabSetPlaceHolder}
        />
      </div>
    </div>
  )
}

export default FlexLayout

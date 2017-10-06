import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'
import Toolbar from './Toolbar'
import { MemoryRouter } from 'react-router-dom'
const props = overrides => ({
   ...{
     messagesLength: 2,
     unreadCount: 0,
     selectedCount: 0,
     toggleSelectAll: jest.fn(),
     toggleCompose: jest.fn(),
     markAsRead: jest.fn(),
     markAsUnread: jest.fn(),
     applyLabel: jest.fn(),
     removeLabel: jest.fn(),
     deleteMessages: jest.fn(),
   },
   ...overrides
 })
 const markAsUnread = jest.fn()
 const handleToolbarMessageCheckboxClick = jest.fn()
const markAsRead = jest.fn()
const deleteSelected = jest.fn()
const applyLabel = jest.fn()
const removeLabel = jest.fn()
const toggleComposMessage = jest.fn()

it('calls markAsUnread when the button is enabled', () => {
const messages=[{"id": 1,
 "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
 "starred": true,
 "read": false,
 "selected":true,
 "labels": [
 "dev",
 "personal"
 ],
 },{"id": 2,
 "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
 "starred": false,
 "read": false,
 "labels": [],
 "body": "Hey, it's Penny Mosby,\n\nThat’s life, you know, we never end up where you thought you wanted to be."}]
 const toolbarProps = props({ markAsUnread, selectedCount: 1 })

    const wrapper = mount(
      <MemoryRouter>
        <Toolbar  messages={messages}
         handleToolbarMessageCheckboxClick = {handleToolbarMessageCheckboxClick}
         markAsRead= {markAsRead}
         markAsUnread={markAsUnread}
         deleteSelected = {deleteSelected}
         applyLabel = {applyLabel}
        removeLabel = {removeLabel}
         toggleComposMessage={toggleComposMessage} {...toolbarProps} />
      </MemoryRouter>
    )

    wrapper.find(`[title="Mark as Unread"]`).simulate('click')

    expect(markAsUnread).toHaveBeenCalled()
  })
  it('renders the minus button on the compose route', () => {
    const messages=[{"id": 1,
     "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
     "starred": true,
     "read": false,
     "selected":true,
     "labels": [
     "dev",
     "personal"
     ],
     },{"id": 2,
     "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
     "starred": false,
     "read": false,
     "labels": [],
     "body": "Hey, it's Penny Mosby,\n\nThat’s life, you know, we never end up where you thought you wanted to be."}]
     const toolbarProps = props({ markAsUnread, selectedCount: 1 })

        const wrapper = mount(
          <MemoryRouter >
            <Toolbar  messages={messages}
             handleToolbarMessageCheckboxClick = {handleToolbarMessageCheckboxClick}
             markAsRead= {markAsRead}
             markAsUnread={markAsUnread}
             deleteSelected = {deleteSelected}
             applyLabel = {applyLabel}
            removeLabel = {removeLabel}
             toggleComposMessage={toggleComposMessage} {...toolbarProps} />

       </MemoryRouter>
     )

     expect(wrapper.find(".fa-minus-square-o")).toBePresent()
     expect(wrapper.find(".fa-plu")).not.toBePresent()
   })
   it('renders an empty checkbox when all messages are selected', () => {
     const toolbarProps = props({messagesLength: 2, selectedCount: 2 })

     const messages=[{"id": 1,
      "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
      "starred": true,
      "read": false,
      "selected":true,
      "labels": [
      "dev",
      "personal"
      ],
      },{"id": 2,
      "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
      "starred": false,
        "selected":true,
      "read": false,
      "labels": [],
      "body": "Hey, it's Penny Mosby,\n\nThat’s life, you know, we never end up where you thought you wanted to be."}]
       const wrapper = mount(
           <MemoryRouter >
             <Toolbar  messages={messages}
              handleToolbarMessageCheckboxClick = {handleToolbarMessageCheckboxClick}
              markAsRead= {markAsRead}
              markAsUnread={markAsUnread}
              deleteSelected = {deleteSelected}
              applyLabel = {applyLabel}
             removeLabel = {removeLabel}
              toggleComposMessage={toggleComposMessage} {...toolbarProps} />

       </MemoryRouter>
     )

     expect(wrapper.find(".fa-check-square-o")).toBePresent()
     expect(wrapper.find(".fa fa-check-square-o")).not.toBePresent()
     expect(wrapper.find(".fa fa-minus-square-o")).not.toBePresent()
   })
   it('renders a partially-checked checkbox when some messages are selected', () => {
     const toolbarProps = props({messagesLength: 2, selectedCount: 2 })

     const messages=[{"id": 1,
      "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
      "starred": true,
      "read": false,
      "selected":true,
      "labels": [
      "dev",
      "personal"
      ],
      },{"id": 2,
      "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
      "starred": false,
        "selected":true,
      "read": false,
      "labels": [],
      "body": "Hey, it's Penny Mosby,\n\nThat’s life, you know, we never end up where you thought you wanted to be."}]
       const wrapper = mount(
           <MemoryRouter >
             <Toolbar  messages={messages}
              handleToolbarMessageCheckboxClick = {handleToolbarMessageCheckboxClick}
              markAsRead= {markAsRead}
              markAsUnread={markAsUnread}
              deleteSelected = {deleteSelected}
              applyLabel = {applyLabel}
             removeLabel = {removeLabel}
              toggleComposMessage={toggleComposMessage} {...toolbarProps} />

        </MemoryRouter>
      )

      expect(wrapper.find(".fa-square-o")).not.toBePresent()
      expect(wrapper.find(".fa fa-check-square-o")).not.toBePresent()
      expect(wrapper.find(".fa-minus-square-o")).toBePresent()
    })

it('renders a checked checkbox when all messages are selected', () => {
   const toolbarProps = props({messagesLength: 2, selectedCount: 2 })

   const messages=[{"id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "starred": true,
    "read": false,
    "selected":true,
    "labels": [
    "dev",
    "personal"
    ],
    },{"id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "starred": false,
      "selected":true,
    "read": false,
    "labels": [],
    "body": "Hey, it's Penny Mosby,\n\nThat’s life, you know, we never end up where you thought you wanted to be."}]
     const wrapper = mount(
         <MemoryRouter >
           <Toolbar  messages={messages}
            handleToolbarMessageCheckboxClick = {handleToolbarMessageCheckboxClick}
            markAsRead= {markAsRead}
            markAsUnread={markAsUnread}
            deleteSelected = {deleteSelected}
            applyLabel = {applyLabel}
           removeLabel = {removeLabel}
            toggleComposMessage={toggleComposMessage} {...toolbarProps} />

     </MemoryRouter>
   )

   expect(wrapper.find(".fa-square-o")).not.toBePresent()
   expect(wrapper.find(".fa-check-square-o")).toBePresent()
   expect(wrapper.find(".fa fa-minus-square-o")).not.toBePresent()
 })

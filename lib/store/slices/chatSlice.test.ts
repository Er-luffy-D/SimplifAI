import { configureStore } from '@reduxjs/toolkit'
import chatReducer, { Add_chat, Delete_chat, Drop_chat } from './chatSlice'

type ChatState = {
  user: string;
  chats: Array<{
    date: string;
    id: string;
    user: boolean;
    content: string;
  }>;
}

type RootState = {
  chat: ChatState;
}

describe('chatSlice reducer', () => {
  let store: ReturnType<typeof configureStore<RootState>>
  
  beforeEach(() => {
    store = configureStore({
      reducer: {
        chat: chatReducer
      }
    })
  })

  describe('Initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().chat
      expect(state.user).toBe('')
      expect(state.chats).toEqual([])
    })
  })

  describe('Add_chat', () => {
    it('should add a new chat to the state and set user', () => {
      const payload = {
        user: 'testUser',
        chat: {
          id: '1',
          content: 'Hello world!',
          user: true,
          date: '2025-01-01'
        }
      }

      store.dispatch(Add_chat(payload))
      
      const state = store.getState().chat
      expect(state.user).toBe('testUser')
      expect(state.chats).toHaveLength(1)
      expect(state.chats[0]).toEqual(payload.chat)
    })

    it('should add multiple chats and update user', () => {
      const firstPayload = {
        user: 'user1',
        chat: {
          id: '1',
          content: 'First message',
          user: true,
          date: '2025-01-01'
        }
      }
      
      const secondPayload = {
        user: 'user2',
        chat: {
          id: '2',
          content: 'Second message',
          user: false,
          date: '2025-01-02'
        }
      }

      store.dispatch(Add_chat(firstPayload))
      store.dispatch(Add_chat(secondPayload))
      
      const state = store.getState().chat
      expect(state.user).toBe('user2')
      expect(state.chats).toHaveLength(2)
      expect(state.chats[0]).toEqual(firstPayload.chat)
      expect(state.chats[1]).toEqual(secondPayload.chat)
    })

    it('should handle adding chat with same id (no duplicate prevention)', () => {
      const payload = {
        user: 'testUser',
        chat: {
          id: '1',
          content: 'Hello world!',
          user: true,
          date: '2025-01-01'
        }
      }

      store.dispatch(Add_chat(payload))
      store.dispatch(Add_chat(payload))
      
      const state = store.getState().chat
      expect(state.chats).toHaveLength(2)
      expect(state.chats[0]).toEqual(payload.chat)
      expect(state.chats[1]).toEqual(payload.chat)
    })
  })

  describe('Delete_chat', () => {
    beforeEach(() => {
      const chats = [
        { id: '1', content: 'First message', user: true, date: '2025-01-01' },
        { id: '2', content: 'Second message', user: false, date: '2025-01-02' },
        { id: '3', content: 'Third message', user: true, date: '2025-01-03' }
      ]

      chats.forEach(chat => {
        store.dispatch(Add_chat({ user: 'testUser', chat }))
      })
    })

    it('should delete chat by id correctly', () => {
      const initialLength = store.getState().chat.chats.length
      expect(initialLength).toBe(3)
      
      store.dispatch(Delete_chat({ id: '2' }))
      
      const state = store.getState().chat
      expect(state.chats).toHaveLength(2)
      expect(state.chats.map(chat => chat.id)).toEqual(['1', '3'])
    })

    it('should delete first and last chats correctly', () => {
      store.dispatch(Delete_chat({ id: '1' }))
      let state = store.getState().chat
      expect(state.chats.map(chat => chat.id)).toEqual(['2', '3'])
      
      store.dispatch(Add_chat({ user: 'testUser', chat: { id: '1', content: 'First message', user: true, date: '2025-01-01' } }))
      store.dispatch(Delete_chat({ id: '3' }))
      state = store.getState().chat
      expect(state.chats.map(chat => chat.id)).toEqual(['2', '1'])
    })

    it('should not affect state when deleting non-existent chat', () => {
      const initialState = store.getState().chat
      
      store.dispatch(Delete_chat({ id: 'non-existent-id' }))
      
      const state = store.getState().chat
      expect(state.chats).toHaveLength(initialState.chats.length)
      expect(state.chats).toEqual(initialState.chats)
      expect(state.user).toBe(initialState.user)
    })

    it('should handle deleting from empty chat list', () => {
      const emptyStore = configureStore({
        reducer: {
          chat: chatReducer
        }
      })
      
      emptyStore.dispatch(Delete_chat({ id: '1' }))
      
      const state = emptyStore.getState().chat
      expect(state.chats).toHaveLength(0)
      expect(state.user).toBe('')
    })
  })

  describe('Drop_chat', () => {
    beforeEach(() => {
      const chats = [
        { id: '1', content: 'Message 1', user: true, date: '2025-01-01' },
        { id: '2', content: 'Message 2', user: false, date: '2025-01-02' }
      ]

      chats.forEach(chat => {
        store.dispatch(Add_chat({ user: 'testUser', chat }))
      })
    })

    it('should clear all chats from state', () => {
      const initialState = store.getState().chat
      expect(initialState.chats).toHaveLength(2)
      expect(initialState.user).toBe('testUser')
      
      store.dispatch(Drop_chat())
      
      const state = store.getState().chat
      expect(state.chats).toHaveLength(0)
      expect(state.chats).toEqual([])
    })

    it('should preserve user when dropping chats', () => {
      const initialState = store.getState().chat
      expect(initialState.user).toBe('testUser')
      
      store.dispatch(Drop_chat())
      
      const state = store.getState().chat
      expect(state.user).toBe('testUser')
    })

    it('should work with empty chat list', () => {
      const emptyStore = configureStore({
        reducer: {
          chat: chatReducer
        }
      })
      
      emptyStore.dispatch(Drop_chat())
      
      const state = emptyStore.getState().chat
      expect(state.chats).toHaveLength(0)
      expect(state.user).toBe('')
    })

    it('should handle multiple drop operations', () => {
      store.dispatch(Drop_chat())
      store.dispatch(Drop_chat())
      store.dispatch(Drop_chat())
      
      const state = store.getState().chat
      expect(state.chats).toHaveLength(0)
      expect(state.user).toBe('testUser')
    })
  })

  describe('State integrity and immutability', () => {
    it('should maintain immutability when adding chat', () => {
      const initialState = store.getState().chat
      const payload = {
        user: 'testUser',
        chat: {
          id: '1',
          content: 'Test message',
          user: true,
          date: '2025-01-01'
        }
      }

      store.dispatch(Add_chat(payload))
      
      const newState = store.getState().chat
      expect(newState).not.toBe(initialState)
      expect(newState.chats).not.toBe(initialState.chats)
    })

    it('should maintain immutability when deleting chat', () => {
      const payload = {
        user: 'testUser',
        chat: {
          id: '1',
          content: 'Test message',
          user: true,
          date: '2025-01-01'
        }
      }
      
      store.dispatch(Add_chat(payload))
      const stateAfterAdd = store.getState().chat
      
      store.dispatch(Delete_chat({ id: '1' }))
      const stateAfterDelete = store.getState().chat
      
      expect(stateAfterDelete).not.toBe(stateAfterAdd)
      expect(stateAfterDelete.chats).not.toBe(stateAfterAdd.chats)
    })

    it('should maintain immutability when dropping chats', () => {
      const payload = {
        user: 'testUser',
        chat: {
          id: '1',
          content: 'Test message',
          user: true,
          date: '2025-01-01'
        }
      }
      
      store.dispatch(Add_chat(payload))
      const stateAfterAdd = store.getState().chat
      
      store.dispatch(Drop_chat())
      const stateAfterDrop = store.getState().chat
      
      expect(stateAfterDrop).not.toBe(stateAfterAdd)
      expect(stateAfterDrop.chats).not.toBe(stateAfterAdd.chats)
    })
  })
})

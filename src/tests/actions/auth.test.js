import {login, logout} from '../../actions/auth';


test('should generate login action object', () => {
    
    const uid = 'LOGIN';
    const action = login(uid);
    expect(action).toEqual({
        type:'LOGIN',
        uid
    });
});

  
test('should clear uid for login', () => {
      const action = logout();
      expect(action).toEqual({
          type: 'LOGOUT'
      });
  });
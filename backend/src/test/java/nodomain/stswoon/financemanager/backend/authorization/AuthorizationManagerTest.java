package nodomain.stswoon.financemanager.backend.authorization;

import nodomain.stswoon.financemanager.backend.security.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AuthorizationManagerTest {
    @Test(expected = IllegalArgumentException.class)
    public void testNullEntityType() {
        AuthorizationManager authorizationManager = new AuthorizationManager(null, null);
        authorizationManager.hasAccess(null, 1l);
    }

    @Mock
    private UserService.User user;
    @Mock
    private UserService userService;
    @Mock
    private AuthorizationChecker authorizationChecker;

    @Test
    public void testHasAccess() {
        final Long USER_ID = 42l;
        final Long ENTITY_ID = 43l;
        final AuthorizationManager.EntityType ENTITY_TYPE = AuthorizationManager.EntityType.PROJECT;

        when(user.getId()).thenReturn(USER_ID);
        when(userService.getUser()).thenReturn(user);
        when(authorizationChecker.getEntityType()).thenReturn(ENTITY_TYPE);
        when(authorizationChecker.check(ENTITY_ID, USER_ID)).thenReturn(true);

        AuthorizationManager authorizationManager = new AuthorizationManager(userService, Arrays.asList(authorizationChecker));
        boolean ar = authorizationManager.hasAccess(ENTITY_TYPE, ENTITY_ID);
        Assert.assertEquals(true, ar);
    }

}
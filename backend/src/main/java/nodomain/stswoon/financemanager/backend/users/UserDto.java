package nodomain.stswoon.financemanager.backend.users;

import lombok.Data;

@Data
public class UserDto {
    private final Long id;
    private final String login;
    private final String password;
}

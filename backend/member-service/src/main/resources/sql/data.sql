insert into member (member_id, name, uuid, email, tel, birth,
                    my_team_id, my_team_name, ipv4_address,
                    role, provider_type, is_deleted, is_certificated,
                    created_at, updated_at)
values (123, 'test name', '1604b772-adc0-4212-8a90-81186c57f598', 'test@email.com', '01012345678', '2000-01-01',
        1, '기아', '1', 'ROLE_USER', 'KAKAO', false, true,
        '2024-01-01', '2024-01-01')
;

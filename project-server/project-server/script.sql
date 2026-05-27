-- reac > project-server > script.sql
drop table tblUser cascade constraints;

-- 회원
create table tblUser (
    username varchar2(50) primary key,  --아이디
    password varchar2(100) not null,    --암호
    role varchar2(50) not null,         --회원(ROLE_MEMBER), 관리자(ROLE_ADMIN)
    name varchar2(50) not null,         --이름
    email varchar2(100) not null        --이메일
);


drop table tblBoard cascade constraints;
-- 게시판
create table tblBoard (
    seq number primary key,                                     --번호
    subject varchar2(500) not null,                             --제목
    content varchar2(4000) not null,                           --내용
    regdate date default sysdate not null,                      --날짜
    username varchar2(50) not null references tblUser(username) --아이디
);

drop sequence seqBoard;
create sequence seqBoard;










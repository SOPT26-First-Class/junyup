# WEEK4/MISSION1 - 데이터베이스 설계하기

## 조건
1. User 개체에는 name, id, password 가 있다.
2. Article 개체에는 author, title, content, likes, comment 가 있다.
3. 모든 유저는 모든 Article에 ‘좋아요’를 할 수 있다.
4. 한 Article에 comment는 여러 개 일 수 있다.


## 설계
### User Table
| uid | name | id | hash | salt | email | phone | createdAt | lastLoginedAt |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | junyup | junyup123 | abc | qwer | junyup@gmail.com | 010-1111-1111 | 1592304345894 | 1592304345894 |
| 2 | alice | alice111 | bcd | asdf | alice@gmail.com | 010-2222-2222 | 1592301245894 | 1592304341294 |
| 3 | bob | bob321 | cde | zxcv | bob@gmai.com | 010-3333-3333 | 1592281245894 | 1592304345894 |

* **primary key**: uid


### Article Table
| aid | uid | title | content | createdAt | updatedAt |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 1 | junyup’s title | junyup’s content | 1592304345894 | 1592304345894 |

* **primary key**: aid
* **foreign key**: uid


### Comment Table
| cid | uid | aid | content | createdAt | updatedAt |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 1 | 1 | comment1 | 1592304345894 | 1592304345894 |
| 2 | 2 | 1 | comment2 | 1592304345894 | 1592304345894 |

* **primary key**: cid
* **foreign key**: uid, aid


### Like Table
| lid | uid | aid | createdAt |
|:---:|:---:|:---:|:---:|
| 1 | 3 | 1 | 1592304345894 |
| 2 | 2 | 1 | 1592304341234 |

* **primary key**: lid
* **foreign key**: uid, aid


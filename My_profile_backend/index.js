const { request } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const databaseConnection = require('./dbConnection');

const app = express();
const port = 3002;
app.use(express.json());
app.use(cors());

databaseConnection();
app.use('/' , require('./routes/welcome'));

app.use('/user_authorization', require('./routes/user_authentication'))
app.use('/user_personal_information', require('./routes/user_personal_information_insert'))
app.use('/user_skill_status', require('./routes/user_skill_state_insert'))
app.use('/profilepic', require('./routes/user_profilepic_insert'))
app.use('/post_create', require('./routes/user_post_insert'))
app.use('/user_authentication', require('./routes/user_login'))
app.use('/displayimage', require('./routes/displaypost'))
app.use('/getprofilepic', require('./routes/getUser_profilepic'))
app.use('/friend_in_city', require('./routes/friendinCity'))
app.use('/friend_in_skill', require('./routes/friendinSkill'))
app.use('/user_get_skill_status', require('./routes/user_get_skill'))
app.use('/forget_password', require('./routes/user_name_email'))
app.use('/change_password', require('./routes/changepassword'))
// app.use('/user/skill', require('./routes/user_skill_insert'))
app.use('/user_getpersonalinfo', require('./routes/user_get_personalinfo'))
// app.use('/user_get_status', require('./routes/user_get_status'))

app.use('/friends', require('./routes/getFriends'))
app.use('/followfriend', require('./routes/followfriend') )
app.use('/unfollow_following', require('./routes/unfollowFollowing') )
app.use('/remove_follower', require('./routes/removeFollower'))
app.use('/likeordislike', require('./routes/likeordislike'))
app.use('/get_page_follow', require('./routes/getpagefollow'))
app.use('/get_user_noti', require('./routes/user_notification'))
app.use('/askfor', require('./routes/askfor'))

app.use('/page_authentication', require('./routes/pageAuthentication'))
app.use('/search/friend', require('./routes/searchFriend'))
app.use('/admin', require('./routes/admin'))
app.use('/user_admin_update', require('./routes/user_admin_update'))
app.use('/user_update', require('./routes/userup'))
app.use('/search/page', require('./routes/searchPage'))
app.use('/follow_page', require('./routes/followPage'))
app.use('/page_info', require('./routes/page_info'))
app.use('/findadmin', require('./routes/findadmin'))
app.use('/adminlist', require('./routes/adminlist'))
app.use('/addadmin', require('./routes/addadmin'))
app.use('/removeadmin', require('./routes/removeadmin'))
app.use('/lastweek', require('./routes/replastweek'))
app.use('/lastmonth', require('./routes/replastmonth'))
app.use('/thismonth', require('./routes/thismonth'))
app.use('/thisyear', require('./routes/thisyear'))
app.use('/pagepost', require('./routes/pagepost'))
app.use('/getpagepost', require('./routes/displaypagepost'))
app.use('/getusers', require('./routes/getusers'))
app.use('/search', require('./routes/userfilter'))
app.use('/demo', require('./routes/collectionUp'))
app.use('/createrecrutment', require('./routes/postrecrutment'))
app.use('/submitrecrutment', require('./routes/submitrecrutment'))
app.use('/getrecrutment', require('./routes/getrecrutment'))
app.use('/recrutmentinfo', require('./routes/recrutmentinfo'))
app.use('/email', require('./routes/testemail'))
app.use('/page_data', require('./routes/pagedata'))
app.use('/get_page_info', require('./routes/pageinfo'))
app.use('/page_follower', require('./routes/page_followerlist'))
app.use('/admin_photo', require('./routes/adminsprofile'))
app.use('/conversations', require('./routes/conversation'))
app.use('/message', require('./routes/message'))
app.use('/update', require('./routes/upusername'))

app.listen(port,() => {
    console.log(`'server satred at localhost:${port}'`)
});
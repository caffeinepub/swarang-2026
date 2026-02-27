import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Runtime "mo:core/Runtime";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type EventInfo = {
    name : Text;
    dates : Text;
    location : Text;
    about : Text;
    contactEmail : Text;
    contactPhone : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  var googleFormEmbedUrl : Text = "";
  var eventInfo : EventInfo = {
    name = "SWARANG 2026";
    dates = "";
    location = "";
    about = "";
    contactEmail = "";
    contactPhone = "";
  };

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public queries - no authorization needed
  public query ({ caller }) func getGoogleFormEmbedUrl() : async Text {
    googleFormEmbedUrl;
  };

  public query ({ caller }) func getEventInfo() : async EventInfo {
    eventInfo;
  };

  // Admin-only functions
  public shared ({ caller }) func setGoogleFormEmbedUrl(newUrl : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update form URL");
    };
    googleFormEmbedUrl := newUrl;
  };

  public shared ({ caller }) func updateEventInfo(
    name : Text,
    dates : Text,
    location : Text,
    about : Text,
    contactEmail : Text,
    contactPhone : Text,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update event info");
    };
    eventInfo := {
      name;
      dates;
      location;
      about;
      contactEmail;
      contactPhone;
    };
  };
};

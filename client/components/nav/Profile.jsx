
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { CiUser, CiSettings } from "react-icons/ci";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { PiSignOut } from "react-icons/pi";




const Profile = () => {
    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem>
                        <div className="flex items-center gap-x-3">
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                            <div>
                                <p className="font-semibold">Zoya</p>
                                <p className="font-light text-xs">Admin</p>
                            </div>
                        </div>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        <div className="flex items-center gap-1">
                            <CiUser size={20} />
                            Profile
                        </div>
                    </DropdownItem>
                    <DropdownItem key="team_settings">
                        <div className="flex items-center gap-1">
                            <CiSettings size={20} />
                            Settings
                        </div>
                    </DropdownItem>
                    <DropdownItem key="analytics">
                        <div className="flex items-center gap-1">
                            <IoAnalyticsSharp size={20} />

                            Analytics
                        </div>
                    </DropdownItem>

                    <DropdownItem key="help_and_feedback">
                        <div className="flex items-center gap-1">
                            <FaQuestion size={18} />

                            FAQ
                        </div>
                    </DropdownItem>
                    <DropdownItem>
                        <button className="bg-red-500 flex gap-2 items-center justify-center w-full text-white py-2 rounded-md">
                            Log Out
                            <PiSignOut />
                        </button>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>


    )
}

export default Profile
